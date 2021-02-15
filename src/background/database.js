const { knex, init } = require("../libs/mysql");

import { ipcMain } from "electron";
import {
  GLOBAL_MESSAGE_BOX,
  INIT_MYSQL_CONNECTION,
  TEST_MYSQL_CONNECTION,
} from "../constants";

ipcMain.on(INIT_MYSQL_CONNECTION, (event, payload) => {
  init(payload);
  knex()
    .raw("SHOW TABLES")
    .then(() => {
      knex()
        .raw(
          "CREATE DATABASE IF NOT EXISTS foxy DEFAULT CHARSET utf8 COLLATE utf8_general_ci"
        )
        .then(() => {
          Promise.all([
            knex()
              .raw(
                "CREATE TABLE IF NOT EXISTS `foxy`.`dbc_spell` (`ID` INT NOT NULL DEFAULT '0',`Category` INT UNSIGNED NOT NULL DEFAULT '0',`DispelType` INT UNSIGNED NOT NULL DEFAULT '0',`Mechanic` INT UNSIGNED NOT NULL DEFAULT '0',`Attributes` INT UNSIGNED NOT NULL DEFAULT '0',`AttributesEx` INT UNSIGNED NOT NULL DEFAULT '0',`AttributesExB` INT UNSIGNED NOT NULL DEFAULT '0',`AttributesExC` INT UNSIGNED NOT NULL DEFAULT '0',`AttributesExD` INT UNSIGNED NOT NULL DEFAULT '0',`AttributesExE` INT UNSIGNED NOT NULL DEFAULT '0',`AttributesExF` INT UNSIGNED NOT NULL DEFAULT '0',`AttributesExG` INT UNSIGNED NOT NULL DEFAULT '0',`ShapeshiftMask` INT UNSIGNED NOT NULL DEFAULT '0',`Unk_13` INT UNSIGNED NOT NULL DEFAULT '0',`ShapeshiftExclude` INT UNSIGNED NOT NULL DEFAULT '0',`Unk_15` INT UNSIGNED NOT NULL DEFAULT '0',`Targets` INT UNSIGNED NOT NULL DEFAULT '0',`TargetCreatureType` INT UNSIGNED NOT NULL DEFAULT '0',`RequiresSpellFocus` INT UNSIGNED NOT NULL DEFAULT '0',`FacingCasterFlags` INT UNSIGNED NOT NULL DEFAULT '0',`CasterAuraState` INT UNSIGNED NOT NULL DEFAULT '0',`TargetAuraState` INT UNSIGNED NOT NULL DEFAULT '0',`ExcludeCasterAuraState` INT UNSIGNED NOT NULL DEFAULT '0',`ExcludeTargetAuraState` INT UNSIGNED NOT NULL DEFAULT '0',`CasterAuraSpell` INT UNSIGNED NOT NULL DEFAULT '0',`TargetAuraSpell` INT UNSIGNED NOT NULL DEFAULT '0',`ExcludeCasterAuraSpell` INT UNSIGNED NOT NULL DEFAULT '0',`ExcludeTargetAuraSpell` INT UNSIGNED NOT NULL DEFAULT '0',`CastingTimeIndex` INT UNSIGNED NOT NULL DEFAULT '0',`RecoveryTime` INT UNSIGNED NOT NULL DEFAULT '0',`CategoryRecoveryTime` INT UNSIGNED NOT NULL DEFAULT '0',`InterruptFlags` INT UNSIGNED NOT NULL DEFAULT '0',`AuraInterruptFlags` INT UNSIGNED NOT NULL DEFAULT '0',`ChannelInterruptFlags` INT UNSIGNED NOT NULL DEFAULT '0',`ProcTypeMask` INT UNSIGNED NOT NULL DEFAULT '0',`ProcChance` INT UNSIGNED NOT NULL DEFAULT '0',`ProcCharges` INT UNSIGNED NOT NULL DEFAULT '0',`MaxLevel` INT UNSIGNED NOT NULL DEFAULT '0',`BaseLevel` INT UNSIGNED NOT NULL DEFAULT '0',`SpellLevel` INT UNSIGNED NOT NULL DEFAULT '0',`DurationIndex` INT UNSIGNED NOT NULL DEFAULT '0',`PowerType` INT NOT NULL DEFAULT '0',`ManaCost` INT UNSIGNED NOT NULL DEFAULT '0',`ManaCostPerLevel` INT UNSIGNED NOT NULL DEFAULT '0',`ManaPerSecond` INT UNSIGNED NOT NULL DEFAULT '0',`ManaPerSecondPerLevel` INT UNSIGNED NOT NULL DEFAULT '0',`RangeIndex` INT UNSIGNED NOT NULL DEFAULT '0',`Speed` FLOAT NOT NULL DEFAULT '0',`ModalNextSpell` INT UNSIGNED NOT NULL DEFAULT '0',`CumulativeAura` INT UNSIGNED NOT NULL DEFAULT '0',`Totem_1` INT UNSIGNED NOT NULL DEFAULT '0',`Totem_2` INT UNSIGNED NOT NULL DEFAULT '0',`Reagent_1` INT NOT NULL DEFAULT '0',`Reagent_2` INT NOT NULL DEFAULT '0',`Reagent_3` INT NOT NULL DEFAULT '0',`Reagent_4` INT NOT NULL DEFAULT '0',`Reagent_5` INT NOT NULL DEFAULT '0',`Reagent_6` INT NOT NULL DEFAULT '0',`Reagent_7` INT NOT NULL DEFAULT '0',`Reagent_8` INT NOT NULL DEFAULT '0',`ReagentCount_1` INT NOT NULL DEFAULT '0',`ReagentCount_2` INT NOT NULL DEFAULT '0',`ReagentCount_3` INT NOT NULL DEFAULT '0',`ReagentCount_4` INT NOT NULL DEFAULT '0',`ReagentCount_5` INT NOT NULL DEFAULT '0',`ReagentCount_6` INT NOT NULL DEFAULT '0',`ReagentCount_7` INT NOT NULL DEFAULT '0',`ReagentCount_8` INT NOT NULL DEFAULT '0',`EquippedItemClass` INT NOT NULL DEFAULT '0',`EquippedItemSubclass` INT NOT NULL DEFAULT '0',`EquippedItemInvTypes` INT NOT NULL DEFAULT '0',`Effect_1` INT UNSIGNED NOT NULL DEFAULT '0',`Effect_2` INT UNSIGNED NOT NULL DEFAULT '0',`Effect_3` INT UNSIGNED NOT NULL DEFAULT '0',`EffectDieSides_1` INT NOT NULL DEFAULT '0',`EffectDieSides_2` INT NOT NULL DEFAULT '0',`EffectDieSides_3` INT NOT NULL DEFAULT '0',`EffectRealPointsPerLevel_1` FLOAT NOT NULL DEFAULT '0',`EffectRealPointsPerLevel_2` FLOAT NOT NULL DEFAULT '0',`EffectRealPointsPerLevel_3` FLOAT NOT NULL DEFAULT '0',`EffectBasePoints_1` INT NOT NULL DEFAULT '0',`EffectBasePoints_2` INT NOT NULL DEFAULT '0',`EffectBasePoints_3` INT NOT NULL DEFAULT '0',`EffectMechanic_1` INT UNSIGNED NOT NULL DEFAULT '0',`EffectMechanic_2` INT UNSIGNED NOT NULL DEFAULT '0',`EffectMechanic_3` INT UNSIGNED NOT NULL DEFAULT '0',`ImplicitTargetA_1` INT UNSIGNED NOT NULL DEFAULT '0',`ImplicitTargetA_2` INT UNSIGNED NOT NULL DEFAULT '0',`ImplicitTargetA_3` INT UNSIGNED NOT NULL DEFAULT '0',`ImplicitTargetB_1` INT UNSIGNED NOT NULL DEFAULT '0',`ImplicitTargetB_2` INT UNSIGNED NOT NULL DEFAULT '0',`ImplicitTargetB_3` INT UNSIGNED NOT NULL DEFAULT '0',`EffectRadiusIndex_1` INT UNSIGNED NOT NULL DEFAULT '0',`EffectRadiusIndex_2` INT UNSIGNED NOT NULL DEFAULT '0',`EffectRadiusIndex_3` INT UNSIGNED NOT NULL DEFAULT '0',`EffectAura_1` INT UNSIGNED NOT NULL DEFAULT '0',`EffectAura_2` INT UNSIGNED NOT NULL DEFAULT '0',`EffectAura_3` INT UNSIGNED NOT NULL DEFAULT '0',`EffectAuraPeriod_1` INT UNSIGNED NOT NULL DEFAULT '0',`EffectAuraPeriod_2` INT UNSIGNED NOT NULL DEFAULT '0',`EffectAuraPeriod_3` INT UNSIGNED NOT NULL DEFAULT '0',`EffectMultipleValue_1` FLOAT NOT NULL DEFAULT '0',`EffectMultipleValue_2` FLOAT NOT NULL DEFAULT '0',`EffectMultipleValue_3` FLOAT NOT NULL DEFAULT '0',`EffectChainTargets_1` INT UNSIGNED NOT NULL DEFAULT '0',`EffectChainTargets_2` INT UNSIGNED NOT NULL DEFAULT '0',`EffectChainTargets_3` INT UNSIGNED NOT NULL DEFAULT '0',`EffectItemType_1` INT UNSIGNED NOT NULL DEFAULT '0',`EffectItemType_2` INT UNSIGNED NOT NULL DEFAULT '0',`EffectItemType_3` INT UNSIGNED NOT NULL DEFAULT '0',`EffectMiscValue_1` INT NOT NULL DEFAULT '0',`EffectMiscValue_2` INT NOT NULL DEFAULT '0',`EffectMiscValue_3` INT NOT NULL DEFAULT '0',`EffectMiscValueB_1` INT NOT NULL DEFAULT '0',`EffectMiscValueB_2` INT NOT NULL DEFAULT '0',`EffectMiscValueB_3` INT NOT NULL DEFAULT '0',`EffectTriggerSpell_1` INT UNSIGNED NOT NULL DEFAULT '0',`EffectTriggerSpell_2` INT UNSIGNED NOT NULL DEFAULT '0',`EffectTriggerSpell_3` INT UNSIGNED NOT NULL DEFAULT '0',`EffectPointsPerCombo_1` FLOAT NOT NULL DEFAULT '0',`EffectPointsPerCombo_2` FLOAT NOT NULL DEFAULT '0',`EffectPointsPerCombo_3` FLOAT NOT NULL DEFAULT '0',`EffectSpellClassMaskA_1` INT UNSIGNED NOT NULL DEFAULT '0',`EffectSpellClassMaskA_2` INT UNSIGNED NOT NULL DEFAULT '0',`EffectSpellClassMaskA_3` INT UNSIGNED NOT NULL DEFAULT '0',`EffectSpellClassMaskB_1` INT UNSIGNED NOT NULL DEFAULT '0',`EffectSpellClassMaskB_2` INT UNSIGNED NOT NULL DEFAULT '0',`EffectSpellClassMaskB_3` INT UNSIGNED NOT NULL DEFAULT '0',`EffectSpellClassMaskC_1` INT UNSIGNED NOT NULL DEFAULT '0',`EffectSpellClassMaskC_2` INT UNSIGNED NOT NULL DEFAULT '0',`EffectSpellClassMaskC_3` INT UNSIGNED NOT NULL DEFAULT '0',`SpellVisualID_1` INT UNSIGNED NOT NULL DEFAULT '0',`SpellVisualID_2` INT UNSIGNED NOT NULL DEFAULT '0',`SpellIconID` INT UNSIGNED NOT NULL DEFAULT '0',`ActiveIconID` INT UNSIGNED NOT NULL DEFAULT '0',`SpellPriority` INT UNSIGNED NOT NULL DEFAULT '0',`Name_Lang_enUS` TEXT NULL,`Name_Lang_enGB` TEXT NULL,`Name_Lang_koKR` TEXT NULL,`Name_Lang_frFR` TEXT NULL,`Name_Lang_zhCN` TEXT NULL,`Name_Lang_enCN` TEXT NULL,`Name_Lang_deDE` TEXT NULL,`Name_Lang_enTW` TEXT NULL,`Name_Lang_zhTW` TEXT NULL,`Name_Lang_esES` TEXT NULL,`Name_Lang_esMX` TEXT NULL,`Name_Lang_ruRU` TEXT NULL,`Name_Lang_ptPT` TEXT NULL,`Name_Lang_ptBR` TEXT NULL,`Name_Lang_itIT` TEXT NULL,`Name_Lang_Unk` TEXT NULL,`Name_Lang_Mask` INT UNSIGNED NOT NULL DEFAULT '0',`NameSubtext_Lang_enUS` TEXT NULL,`NameSubtext_Lang_enGB` TEXT NULL,`NameSubtext_Lang_koKR` TEXT NULL,`NameSubtext_Lang_frFR` TEXT NULL,`NameSubtext_Lang_zhCN` TEXT NULL,`NameSubtext_Lang_enCN` TEXT NULL,`NameSubtext_Lang_deDE` TEXT NULL,`NameSubtext_Lang_enTW` TEXT NULL,`NameSubtext_Lang_zhTW` TEXT NULL,`NameSubtext_Lang_esES` TEXT NULL,`NameSubtext_Lang_esMX` TEXT NULL,`NameSubtext_Lang_ruRU` TEXT NULL,`NameSubtext_Lang_ptPT` TEXT NULL,`NameSubtext_Lang_ptBR` TEXT NULL,`NameSubtext_Lang_itIT` TEXT NULL,`NameSubtext_Lang_Unk` TEXT NULL,`NameSubtext_Lang_Mask` INT UNSIGNED NOT NULL DEFAULT '0',`Description_Lang_enUS` TEXT NULL,`Description_Lang_enGB` TEXT NULL,`Description_Lang_koKR` TEXT NULL,`Description_Lang_frFR` TEXT NULL,`Description_Lang_zhCN` TEXT NULL,`Description_Lang_enCN` TEXT NULL,`Description_Lang_deDE` TEXT NULL,`Description_Lang_enTW` TEXT NULL,`Description_Lang_zhTW` TEXT NULL,`Description_Lang_esES` TEXT NULL,`Description_Lang_esMX` TEXT NULL,`Description_Lang_ruRU` TEXT NULL,`Description_Lang_ptPT` TEXT NULL,`Description_Lang_ptBR` TEXT NULL,`Description_Lang_itIT` TEXT NULL,`Description_Lang_Unk` TEXT NULL,`Description_Lang_Mask` INT UNSIGNED NOT NULL DEFAULT '0',`AuraDescription_Lang_enUS` TEXT NULL,`AuraDescription_Lang_enGB` TEXT NULL,`AuraDescription_Lang_koKR` TEXT NULL,`AuraDescription_Lang_frFR` TEXT NULL,`AuraDescription_Lang_zhCN` TEXT NULL,`AuraDescription_Lang_enCN` TEXT NULL,`AuraDescription_Lang_deDE` TEXT NULL,`AuraDescription_Lang_enTW` TEXT NULL,`AuraDescription_Lang_zhTW` TEXT NULL,`AuraDescription_Lang_esES` TEXT NULL,`AuraDescription_Lang_esMX` TEXT NULL,`AuraDescription_Lang_ruRU` TEXT NULL,`AuraDescription_Lang_ptPT` TEXT NULL,`AuraDescription_Lang_ptBR` TEXT NULL,`AuraDescription_Lang_itIT` TEXT NULL,`AuraDescription_Lang_Unk` TEXT NULL,`AuraDescription_Lang_Mask` INT UNSIGNED NOT NULL DEFAULT '0',`ManaCostPct` INT UNSIGNED NOT NULL DEFAULT '0',`StartRecoveryCategory` INT UNSIGNED NOT NULL DEFAULT '0',`StartRecoveryTime` INT UNSIGNED NOT NULL DEFAULT '0',`MaxTargetLevel` INT UNSIGNED NOT NULL DEFAULT '0',`SpellClassSet` INT UNSIGNED NOT NULL DEFAULT '0',`SpellClassMask_1` INT UNSIGNED NOT NULL DEFAULT '0',`SpellClassMask_2` INT UNSIGNED NOT NULL DEFAULT '0',`SpellClassMask_3` INT UNSIGNED NOT NULL DEFAULT '0',`MaxTargets` INT UNSIGNED NOT NULL DEFAULT '0',`DefenseType` INT UNSIGNED NOT NULL DEFAULT '0',`PreventionType` INT UNSIGNED NOT NULL DEFAULT '0',`StanceBarOrder` INT UNSIGNED NOT NULL DEFAULT '0',`EffectChainAmplitude_1` FLOAT NOT NULL DEFAULT '0',`EffectChainAmplitude_2` FLOAT NOT NULL DEFAULT '0',`EffectChainAmplitude_3` FLOAT NOT NULL DEFAULT '0',`MinFactionID` INT UNSIGNED NOT NULL DEFAULT '0',`MinReputation` INT UNSIGNED NOT NULL DEFAULT '0',`RequiredAuraVision` INT UNSIGNED NOT NULL DEFAULT '0',`RequiredTotemCategoryID_1` INT UNSIGNED NOT NULL DEFAULT '0',`RequiredTotemCategoryID_2` INT UNSIGNED NOT NULL DEFAULT '0',`RequiredAreasID` INT NOT NULL DEFAULT '0',`SchoolMask` INT UNSIGNED NOT NULL DEFAULT '0',`RuneCostID` INT UNSIGNED NOT NULL DEFAULT '0',`SpellMissileID` INT UNSIGNED NOT NULL DEFAULT '0',`PowerDisplayID` INT NOT NULL DEFAULT '0',`EffectBonusMultiplier_1` FLOAT NOT NULL DEFAULT '0',`EffectBonusMultiplier_2` FLOAT NOT NULL DEFAULT '0',`EffectBonusMultiplier_3` FLOAT NOT NULL DEFAULT '0',`SpellDescriptionVariableID` INT UNSIGNED NOT NULL DEFAULT '0',`SpellDifficultyID` INT UNSIGNED NOT NULL DEFAULT '0',PRIMARY KEY (`ID`)) ENGINE = MyISAM DEFAULT CHARSET = utf8;"
              )
              .then(() => {}),
            knex()
              .raw(
                "CREATE TABLE IF NOT EXISTS `foxy`.`dbc_faction` (`ID` INT NOT NULL DEFAULT '0',`ReputationIndex` INT NOT NULL DEFAULT '0',`ReputationRaceMask_1` INT NOT NULL DEFAULT '0',`ReputationRaceMask_2` INT NOT NULL DEFAULT '0',`ReputationRaceMask_3` INT NOT NULL DEFAULT '0',`ReputationRaceMask_4` INT NOT NULL DEFAULT '0',`ReputationClassMask_1` INT NOT NULL DEFAULT '0',`ReputationClassMask_2` INT NOT NULL DEFAULT '0',`ReputationClassMask_3` INT NOT NULL DEFAULT '0',`ReputationClassMask_4` INT NOT NULL DEFAULT '0',`ReputationBase_1` INT NOT NULL DEFAULT '0',`ReputationBase_2` INT NOT NULL DEFAULT '0',`ReputationBase_3` INT NOT NULL DEFAULT '0',`ReputationBase_4` INT NOT NULL DEFAULT '0',`ReputationFlags_1` INT NOT NULL DEFAULT '0',`ReputationFlags_2` INT NOT NULL DEFAULT '0',`ReputationFlags_3` INT NOT NULL DEFAULT '0',`ReputationFlags_4` INT NOT NULL DEFAULT '0',`ParentFactionID` INT NOT NULL DEFAULT '0',`ParentFactionMod_1` FLOAT NOT NULL DEFAULT '0',`ParentFactionMod_2` FLOAT NOT NULL DEFAULT '0',`ParentFactionCap_1` INT NOT NULL DEFAULT '0',`ParentFactionCap_2` INT NOT NULL DEFAULT '0',`Name_Lang_enUS` TEXT NULL,`Name_Lang_enGB` TEXT NULL,`Name_Lang_koKR` TEXT NULL,`Name_Lang_frFR` TEXT NULL,`Name_Lang_zhCN` TEXT NULL,`Name_Lang_enCN` TEXT NULL,`Name_Lang_deDE` TEXT NULL,`Name_Lang_enTW` TEXT NULL,`Name_Lang_zhTW` TEXT NULL,`Name_Lang_esES` TEXT NULL,`Name_Lang_esMX` TEXT NULL,`Name_Lang_ruRU` TEXT NULL,`Name_Lang_ptPT` TEXT NULL,`Name_Lang_ptBR` TEXT NULL,`Name_Lang_itIT` TEXT NULL,`Name_Lang_Unk` TEXT NULL,`Name_Lang_Mask` INT UNSIGNED NOT NULL DEFAULT '0',`Description_Lang_enUS` TEXT NULL,`Description_Lang_enGB` TEXT NULL,`Description_Lang_koKR` TEXT NULL,`Description_Lang_frFR` TEXT NULL,`Description_Lang_zhCN` TEXT NULL,`Description_Lang_enCN` TEXT NULL,`Description_Lang_deDE` TEXT NULL,`Description_Lang_enTW` TEXT NULL,`Description_Lang_zhTW` TEXT NULL,`Description_Lang_esES` TEXT NULL,`Description_Lang_esMX` TEXT NULL,`Description_Lang_ruRU` TEXT NULL,`Description_Lang_ptPT` TEXT NULL,`Description_Lang_ptBR` TEXT NULL,`Description_Lang_itIT` TEXT NULL,`Description_Lang_Unk` TEXT NULL,`Description_Lang_Mask` INT UNSIGNED NOT NULL DEFAULT '0',PRIMARY KEY (`ID`)) ENGINE = MyISAM DEFAULT CHARSET = utf8;"
              )
              .then(() => {}),
            knex()
              .raw(
                "CREATE TABLE IF NOT EXISTS `foxy`.`dbc_faction_template` (`ID` INT NOT NULL DEFAULT '0',`Faction` INT NOT NULL DEFAULT '0',`Flags` INT NOT NULL DEFAULT '0',`FactionGroup` INT NOT NULL DEFAULT '0',`FriendGroup` INT NOT NULL DEFAULT '0',`EnemyGroup` INT NOT NULL DEFAULT '0',`Enemies_1` INT NOT NULL DEFAULT '0',`Enemies_2` INT NOT NULL DEFAULT '0',`Enemies_3` INT NOT NULL DEFAULT '0',`Enemies_4` INT NOT NULL DEFAULT '0',`Friend_1` INT NOT NULL DEFAULT '0',`Friend_2` INT NOT NULL DEFAULT '0',`Friend_3` INT NOT NULL DEFAULT '0',`Friend_4` INT NOT NULL DEFAULT '0',PRIMARY KEY (`ID`)) ENGINE = MyISAM DEFAULT CHARSET = utf8;"
              )
              .then(() => {}),
            knex()
              .raw(
                "CREATE TABLE IF NOT EXISTS `foxy`.`dbc_item` (`ID` INT NOT NULL DEFAULT '0',`ClassID` INT NOT NULL DEFAULT '0',`SubclassID` INT NOT NULL DEFAULT '0',`Sound_Override_Subclassid` INT NOT NULL DEFAULT '0',`Material` INT NOT NULL DEFAULT '0',`DisplayInfoID` INT NOT NULL DEFAULT '0',`InventoryType` INT NOT NULL DEFAULT '0',`SheatheType` INT NOT NULL DEFAULT '0',PRIMARY KEY (`ID`)) ENGINE = MyISAM DEFAULT CHARSET = utf8;"
              )
              .then(() => {}),
            knex()
              .raw(
                "CREATE TABLE IF NOT EXISTS `foxy`.`dbc_item_display_info` (`ID` INT NOT NULL DEFAULT '0',`ModelName_1` TEXT NULL,`ModelName_2` TEXT NULL,`ModelTexture_1` TEXT NULL,`ModelTexture_2` TEXT NULL,`InventoryIcon_1` TEXT NULL,`InventoryIcon_2` TEXT NULL,`GeosetGroup_1` INT NOT NULL DEFAULT '0',`GeosetGroup_2` INT NOT NULL DEFAULT '0',`GeosetGroup_3` INT NOT NULL DEFAULT '0',`Flags` INT NOT NULL DEFAULT '0',`SpellVisualID` INT NOT NULL DEFAULT '0',`GroupSoundIndex` INT NOT NULL DEFAULT '0',`HelmetGeosetVis_1` INT NOT NULL DEFAULT '0',`HelmetGeosetVis_2` INT NOT NULL DEFAULT '0',`Texture_1` TEXT NULL,`Texture_2` TEXT NULL,`Texture_3` TEXT NULL,`Texture_4` TEXT NULL,`Texture_5` TEXT NULL,`Texture_6` TEXT NULL,`Texture_7` TEXT NULL,`Texture_8` TEXT NULL,`ItemVisual` INT NOT NULL DEFAULT '0',`ParticleColorID` INT NOT NULL DEFAULT '0',PRIMARY KEY (`ID`)) ENGINE = MyISAM DEFAULT CHARSET = utf8;"
              )
              .then(() => {}),
            knex()
              .raw(
                "CREATE TABLE IF NOT EXISTS `foxy`.`dbc_spell_duration` (`ID` INT NOT NULL DEFAULT '0',`Duration` INT NOT NULL DEFAULT '0',`DurationPerLevel` INT NOT NULL DEFAULT '0',`MaxDuration` INT NOT NULL DEFAULT '0',PRIMARY KEY (`ID`)) ENGINE = MyISAM DEFAULT CHARSET = utf8;"
              )
              .then(() => {}),
            knex()
              .raw(
                "CREATE TABLE IF NOT EXISTS `foxy`.`dbc_scaling_stat_distribution` (`ID` INT NOT NULL DEFAULT '0',`StatID_1` INT NOT NULL DEFAULT '0',`StatID_2` INT NOT NULL DEFAULT '0',`StatID_3` INT NOT NULL DEFAULT '0',`StatID_4` INT NOT NULL DEFAULT '0',`StatID_5` INT NOT NULL DEFAULT '0',`StatID_6` INT NOT NULL DEFAULT '0',`StatID_7` INT NOT NULL DEFAULT '0',`StatID_8` INT NOT NULL DEFAULT '0',`StatID_9` INT NOT NULL DEFAULT '0',`StatID_10` INT NOT NULL DEFAULT '0',`Bonus_1` INT NOT NULL DEFAULT '0',`Bonus_2` INT NOT NULL DEFAULT '0',`Bonus_3` INT NOT NULL DEFAULT '0',`Bonus_4` INT NOT NULL DEFAULT '0',`Bonus_5` INT NOT NULL DEFAULT '0',`Bonus_6` INT NOT NULL DEFAULT '0',`Bonus_7` INT NOT NULL DEFAULT '0',`Bonus_8` INT NOT NULL DEFAULT '0',`Bonus_9` INT NOT NULL DEFAULT '0',`Bonus_10` INT NOT NULL DEFAULT '0',`Maxlevel` INT NOT NULL DEFAULT '0',PRIMARY KEY (`ID`)) ENGINE = MyISAM DEFAULT CHARSET = utf8;"
              )
              .then(() => {}),
            knex()
              .raw(
                "CREATE TABLE IF NOT EXISTS `foxy`.`dbc_scaling_stat_values` (`ID` INT NOT NULL DEFAULT '0',`Charlevel` INT NOT NULL DEFAULT '0',`ShoulderBudget` INT NOT NULL DEFAULT '0',`TrinketBudget` INT NOT NULL DEFAULT '0',`WeaponBudget1H` INT NOT NULL DEFAULT '0',`RangedBudget` INT NOT NULL DEFAULT '0',`ClothShoulderArmor` INT NOT NULL DEFAULT '0',`LeatherShoulderArmor` INT NOT NULL DEFAULT '0',`MailShoulderArmor` INT NOT NULL DEFAULT '0',`PlateShoulderArmor` INT NOT NULL DEFAULT '0',`WeaponDPS1H` INT NOT NULL DEFAULT '0',`WeaponDPS2H` INT NOT NULL DEFAULT '0',`SpellcasterDPS1H` INT NOT NULL DEFAULT '0',`SpellcasterDPS2H` INT NOT NULL DEFAULT '0',`RangedDPS` INT NOT NULL DEFAULT '0',`WandDPS` INT NOT NULL DEFAULT '0',`SpellPower` INT NOT NULL DEFAULT '0',`PrimaryBudget` INT NOT NULL DEFAULT '0',`TertiaryBudget` INT NOT NULL DEFAULT '0',`ClothCloakArmor` INT NOT NULL DEFAULT '0',`ClothChestArmor` INT NOT NULL DEFAULT '0',`LeatherChestArmor` INT NOT NULL DEFAULT '0',`MailChestArmor` INT NOT NULL DEFAULT '0',`PlateChestArmor` INT NOT NULL DEFAULT '0',PRIMARY KEY (`ID`)) ENGINE = MyISAM DEFAULT CHARSET = utf8;"
              )
              .then(() => {}),
          ]).then(() => {
            event.reply(INIT_MYSQL_CONNECTION);
          });
        });
    })
    .catch((error) => {
      event.reply(`${INIT_MYSQL_CONNECTION}_REJECT`, error);
      event.reply(GLOBAL_MESSAGE_BOX, error);
    });
});

ipcMain.on(TEST_MYSQL_CONNECTION, (event, payload) => {
  init(payload);
  // 尝试连接数据库，校验配置是否正确
  knex()
    .select("guid")
    .from("creature")
    .first()
    .then((rows) => {
      event.reply(TEST_MYSQL_CONNECTION);
    })
    .catch((error) => {
      event.reply(`${TEST_MYSQL_CONNECTION}_REJECT`, error);
      event.reply(GLOBAL_MESSAGE_BOX, error);
    });
});
