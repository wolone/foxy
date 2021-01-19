import { ipcMain } from "electron";

import {
  SEARCH_NPC_VENDORS,
  STORE_NPC_VENDOR,
  FIND_NPC_VENDOR,
  UPDATE_NPC_VENDOR,
  DESTROY_NPC_VENDOR,
  CREATE_NPC_VENDOR,
  COPY_NPC_VENDOR,
  GLOBAL_NOTICE
} from "../constants";

const { knex } = require("../libs/mysql");

ipcMain.on(SEARCH_NPC_VENDORS, (event, payload) => {
  let queryBuilder = knex()
    .select(["nv.*", "it.displayid", "it.name", "itl.Name"])
    .from("npc_vendor as nv")
    .leftJoin("item_template as it", "nv.item", "it.entry")
    .leftJoin("item_template_locale as itl", function() {
      this.on("nv.item", "=", "itl.ID").andOn(
        "itl.locale",
        "=",
        knex().raw("?", "zhCN")
      );
    })
    .where("nv.entry", payload.entry);

  queryBuilder
    .then(rows => {
      event.reply(SEARCH_NPC_VENDORS, rows);
    })
    .catch(error => {
      throw error;
    })
    .finally(() => {
      event.reply(GLOBAL_NOTICE, {
        category: "message",
        message: queryBuilder.toString()
      });
    });
});

ipcMain.on(STORE_NPC_VENDOR, (event, payload) => {
  let queryBuilder = knex()
    .insert(payload)
    .into("npc_vendor");

  queryBuilder
    .then(rows => {
      event.reply(STORE_NPC_VENDOR, rows);
      event.reply(GLOBAL_NOTICE, {
        category: "notification",
        title: "成功",
        message: "新建成功。",
        type: "success"
      });
    })
    .catch(error => {
      throw error;
    })
    .finally(() => {
      event.reply(GLOBAL_NOTICE, {
        category: "message",
        message: queryBuilder.toString()
      });
    });
});

ipcMain.on(FIND_NPC_VENDOR, (event, payload) => {
  let queryBuilder = knex()
    .select()
    .from("npc_vendor")
    .where(payload);

  queryBuilder
    .then(rows => {
      event.reply(FIND_NPC_VENDOR, rows.length > 0 ? rows[0] : {});
    })
    .catch(error => {
      throw error;
    })
    .finally(() => {
      event.reply(GLOBAL_NOTICE, {
        category: "message",
        message: queryBuilder.toString()
      });
    });
});

ipcMain.on(UPDATE_NPC_VENDOR, (event, payload) => {
  let queryBuilder = knex()
    .table("npc_vendor")
    .where(payload.credential)
    .update(payload.npcVendor);

  queryBuilder
    .then(rows => {
      event.reply(UPDATE_NPC_VENDOR, rows);
      event.reply(GLOBAL_NOTICE, {
        category: "notification",
        title: "成功",
        message: "修改成功。",
        type: "success"
      });
    })
    .catch(error => {
      throw error;
    })
    .finally(() => {
      event.reply(GLOBAL_NOTICE, {
        category: "message",
        message: queryBuilder.toString()
      });
    });
});

ipcMain.on(DESTROY_NPC_VENDOR, (event, payload) => {
  let queryBuilder = knex()
    .table("npc_vendor")
    .where(payload)
    .delete();

  queryBuilder
    .then(rows => {
      event.reply(DESTROY_NPC_VENDOR, rows);
      event.reply("GLOBAL_NOTICE", {
        category: "notification",
        title: "成功",
        message: "删除成功。",
        type: "success"
      });
    })
    .catch(error => {
      throw error;
    })
    .finally(() => {
      event.reply(GLOBAL_NOTICE, {
        category: "message",
        message: queryBuilder.toString()
      });
    });
});

ipcMain.on(COPY_NPC_VENDOR, (event, payload) => {
  let extendedCost = undefined;
  let npcVendor = undefined;

  let extendedCostQueryBuilder = knex()
    .select("ExtendedCost")
    .from("npc_vendor")
    .where("entry", payload.entry)
    .orderBy("ExtendedCost", "desc");
  let findNpcVendorQueryBuilder = knex()
    .select()
    .from("npc_vendor")
    .where(payload);
  Promise.all([
    extendedCostQueryBuilder.then(rows => {
      extendedCost = rows.length > 0 ? rows[0].ExtendedCost : 1;
    }),
    findNpcVendorQueryBuilder.then(rows => {
      npcVendor = rows.length > 0 ? rows[0] : {};
    })
  ])
    .then(() => {
      npcVendor.ExtendedCost = extendedCost + 1;
      let queryBuilder = knex()
        .insert(npcVendor)
        .into("npc_vendor");
      queryBuilder
        .then(rows => {
          event.reply(COPY_NPC_VENDOR, rows);
          event.reply(GLOBAL_NOTICE, {
            type: "success",
            category: "notification",
            title: "成功",
            message: `复制成功，新的装备模板ExtendedCost为${extendedCost + 1}。`
          });
        })
        .catch(error => {
          throw error;
        })
        .finally(() => {
          event.reply(GLOBAL_NOTICE, {
            category: "message",
            message: queryBuilder.toString()
          });
        });
    })
    .catch(error => {
      throw error;
    });
});
