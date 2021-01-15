import { ipcMain } from "electron";
import {
  COPY_GOSSIP_MENU,
  COUNT_GOSSIP_MENUS,
  CREATE_GOSSIP_MENU,
  DESTROY_GOSSIP_MENU,
  FIND_GOSSIP_MENU,
  FIND_NPC_TEXT,
  GLOBAL_NOTICE,
  SEARCH_GOSSIP_MENUS,
  SEARCH_GOSSIP_MENU_OPTIONS,
  SEARCH_NPC_TEXT_LOCALES,
  STORE_GOSSIP_MENU,
  STORE_NPC_TEXT,
  STORE_NPC_TEXT_LOCALES,
  UPDATE_GOSSIP_MENU,
  UPDATE_NPC_TEXT,
} from "../constants";

const { knex } = require("../libs/mysql");

ipcMain.on(SEARCH_GOSSIP_MENUS, (event, payload) => {
  let queryBuilder = knex()
    .select(["gm.*", "nt.text0_0", "nt.text0_1", "ntl.Text0_0", "ntl.Text0_1"])
    .from("gossip_menu as gm")
    .leftJoin("npc_text as nt", "gm.TextID", "nt.ID")
    .leftJoin("npc_text_locale as ntl", function () {
      this.on("gm.TextID", "=", "ntl.ID").andOn("ntl.Locale", "=", knex().raw("?", "zhCN"));
    });
  if (payload.MenuID) {
    queryBuilder = queryBuilder.where("gm.MenuID", "like", `%${payload.MenuID}%`);
  }
  if (payload.Text) {
    queryBuilder = queryBuilder.whereRaw(
      "concat(`nt`.`text0_0`,`nt`.`text0_1`,`ntl`.`Text0_0`,`ntl`.`Text0_1`) like ?",
      [`%${payload.Text}%`]
    );
  }
  queryBuilder = queryBuilder.limit(50).offset(payload.page != undefined ? (payload.page - 1) * 50 : 0);

  queryBuilder.then((rows) => {
    event.reply(SEARCH_GOSSIP_MENUS, rows);
    event.reply(GLOBAL_NOTICE, {
      category: "message",
      message: queryBuilder.toString(),
    });
  });
});

ipcMain.on(COUNT_GOSSIP_MENUS, (event, payload) => {
  let queryBuilder = knex()
    .count("* as total")
    .from("gossip_menu as gm")
    .leftJoin("npc_text as nt", "gm.TextID", "nt.ID")
    .leftJoin("npc_text_locale as ntl", function () {
      this.on("gm.TextID", "=", "ntl.ID").andOn("ntl.Locale", "=", knex().raw("?", "zhCN"));
    });
  if (payload.MenuID) {
    queryBuilder = queryBuilder.where("gm.MenuID", "like", `%${payload.MenuID}%`);
  }
  if (payload.Text) {
    queryBuilder = queryBuilder.whereRaw(
      "concat(`nt`.`text0_0`,`nt`.`text0_1`,`ntl`.`Text0_0`,`ntl`.`Text0_1`) like ?",
      [`%${payload.Text}%`]
    );
  }

  queryBuilder.then((rows) => {
    event.reply(COUNT_GOSSIP_MENUS, rows[0].total);
    event.reply(GLOBAL_NOTICE, {
      category: "message",
      message: queryBuilder.toString(),
    });
  });
});

ipcMain.on(STORE_GOSSIP_MENU, (event, payload) => {
  let queryBuilder = knex().insert(payload).into("gossip_menu");

  queryBuilder.then((rows) => {
    event.reply(STORE_GOSSIP_MENU, rows);
    event.reply(GLOBAL_NOTICE, {
      category: "notification",
      title: "成功",
      message: "新建成功。",
      type: "success",
    });
    event.reply(GLOBAL_NOTICE, {
      category: "message",
      message: queryBuilder.toString(),
    });
  });
});

ipcMain.on(FIND_GOSSIP_MENU, (event, payload) => {
  let queryBuilder = knex().select().from("gossip_menu").where(payload);

  queryBuilder.then((rows) => {
    event.reply(FIND_GOSSIP_MENU, rows.length > 0 ? rows[0] : {});
    event.reply(GLOBAL_NOTICE, {
      category: "message",
      message: queryBuilder.toString(),
    });
  });
});

ipcMain.on(UPDATE_GOSSIP_MENU, (event, payload) => {
  let queryBuilder = knex()
    .table("gossip_menu")
    .where("MenuID", payload.credential.MenuID)
    .where("TextID", payload.credential.TextID)
    .update(payload.gossipMenu);

  queryBuilder.then((rows) => {
    event.reply(UPDATE_GOSSIP_MENU, rows);
    event.reply(GLOBAL_NOTICE, {
      category: "notification",
      title: "成功",
      message: "修改成功。",
      type: "success",
    });
    event.reply(GLOBAL_NOTICE, {
      category: "message",
      message: queryBuilder.toString(),
    });
  });
});

ipcMain.on(DESTROY_GOSSIP_MENU, (event, payload) => {
  let queryBuilder = knex().table("gossip_menu").where(payload).delete();

  queryBuilder.then((rows) => {
    event.reply(DESTROY_GOSSIP_MENU, rows);
    event.reply("GLOBAL_NOTICE", {
      category: "notification",
      title: "成功",
      message: "删除成功。",
      type: "success",
    });
    event.reply(GLOBAL_NOTICE, {
      category: "message",
      message: queryBuilder.toString(),
    });
  });
});

ipcMain.on(CREATE_GOSSIP_MENU, (event, payload) => {
  let queryBuilder = knex().select("MenuID").from("gossip_menu").orderBy("MenuID", "desc");

  queryBuilder.then((rows) => {
    event.reply(CREATE_GOSSIP_MENU, {
      MenuID: rows[0].MenuID + 1,
    });
    event.reply(GLOBAL_NOTICE, {
      category: "message",
      message: queryBuilder.toString(),
    });
  });
});

ipcMain.on(COPY_GOSSIP_MENU, (event, payload) => {
  let MenuID = undefined;
  let gossipMenu = undefined;

  let menuIdQueryBuilder = knex().select("MenuID").from("gossip_menu").orderBy("MenuID", "desc");
  let findGossipMenuQueryBuilder = knex().select().from("gossip_menu").where(payload);
  Promise.all([
    menuIdQueryBuilder.then((rows) => {
      MenuID = rows[0].MenuID;
    }),
    findGossipMenuQueryBuilder.then((rows) => {
      gossipMenu = rows.length > 0 ? rows[0] : {};
    }),
  ]).then(() => {
    gossipMenu.MenuID = MenuID + 1;
    let queryBuilder = knex().insert(gossipMenu).into("gossip_menu");
    queryBuilder.then((rows) => {
      event.reply(COPY_GOSSIP_MENU, rows);
      event.reply(GLOBAL_NOTICE, {
        type: "success",
        category: "notification",
        title: "成功",
        message: `复制成功，新的对话 MenuID 为 ${MenuID + 1}。`,
      });
      event.reply(GLOBAL_NOTICE, {
        category: "message",
        message: queryBuilder.toString(),
      });
    });
  });
});

ipcMain.on(STORE_NPC_TEXT, (event, payload) => {
  let queryBuilder = knex().insert(payload).into("npc_text");

  queryBuilder.then((rows) => {
    event.reply(STORE_NPC_TEXT, rows);
    event.reply(GLOBAL_NOTICE, {
      category: "notification",
      title: "成功",
      message: "新建成功。",
      type: "success",
    });
    event.reply(GLOBAL_NOTICE, {
      category: "message",
      message: queryBuilder.toString(),
    });
  });
});

ipcMain.on(FIND_NPC_TEXT, (event, payload) => {
  let queryBuilder = knex().select().from("npc_text").where(payload);

  queryBuilder.then((rows) => {
    event.reply(FIND_NPC_TEXT, rows.length > 0 ? rows[0] : {});
    event.reply(GLOBAL_NOTICE, {
      category: "message",
      message: queryBuilder.toString(),
    });
  });
});

ipcMain.on(UPDATE_NPC_TEXT, (event, payload) => {
  let queryBuilder = knex().table("npc_text").where("ID", payload.credential.ID).update(payload.npcText);

  queryBuilder.then((rows) => {
    event.reply(UPDATE_NPC_TEXT, rows);
    event.reply(GLOBAL_NOTICE, {
      category: "notification",
      title: "成功",
      message: "修改成功。",
      type: "success",
    });
    event.reply(GLOBAL_NOTICE, {
      category: "message",
      message: queryBuilder.toString(),
    });
  });
});

ipcMain.on(SEARCH_NPC_TEXT_LOCALES, (event, payload) => {
  let queryBuilder = knex().select().from("npc_text_locale").where(payload);

  queryBuilder.then((rows) => {
    event.reply(SEARCH_NPC_TEXT_LOCALES, rows);
    event.reply(GLOBAL_NOTICE, {
      category: "message",
      message: queryBuilder.toString(),
    });
  });
});

ipcMain.on(STORE_NPC_TEXT_LOCALES, (event, payload) => {
  let deleteQueryBuilder = knex().table("npc_text_locale").where("ID", payload[0].ID).delete();
  let insertQueryBuilder = knex().insert(payload).into("npc_text_locale");

  deleteQueryBuilder.then(() => {
    insertQueryBuilder.then((rows) => {
      event.reply(STORE_NPC_TEXT_LOCALES, rows);
      event.reply(GLOBAL_NOTICE, {
        type: "success",
        category: "notification",
        title: "成功",
        message: `保存成功。`,
      });
      event.reply(GLOBAL_NOTICE, {
        category: "message",
        message: queryBuilder.toString(),
      });
    });
  });
});

ipcMain.on(SEARCH_GOSSIP_MENU_OPTIONS, (event, payload) => {
  let queryBuilder = knex()
    .select(["gmo.*", "gmol.OptionText as localeOptionText"])
    .from("gossip_menu_option as gmo")
    .leftJoin("gossip_menu_option_locale as gmol", function () {
      this.on("gmo.MenuID", "=", "gmol.MenuID")
        .andOn("gmo.OptionID", "=", "gmol.OptionID")
        .andOn("gmol.Locale", "=", knex().raw("?", "zhCN"));
    })
    .where("gmo.MenuID", payload.MenuID);

  queryBuilder.then((rows) => {
    event.reply(SEARCH_GOSSIP_MENU_OPTIONS, rows);
    event.reply(GLOBAL_NOTICE, {
      category: "message",
      message: queryBuilder.toString(),
    });
  });
});
