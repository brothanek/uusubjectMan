"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/subject-error.js");
const SubjectmanAbl =  require("./subjectman-main-abl");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },
  removeUnsupportedKeys: {
    code: `${Errors.Remove.UC_CODE}unsupportedKeys`,
  },
  editUnsupportedKeys: {
    code: `${Errors.Edit.UC_CODE}unsupportedKeys`,
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  },
  subjectEditTopicMissing: {
    code: `${Errors.Edit.UC_CODE}subjectEditTopicMissing`,
  },
  subjectCreateTopicMissing: {
    code: `${Errors.Create.UC_CODE}subjectCreateTopicMissing`,
  }
};

const DEFAULTS = {
  list: {
    sortBy: "name",
    order: "asc",
    pageIndex: 0,
    pageSize: 100,
  }
};

class SubjectAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("subject");
    this.daoTopic = DaoFactory.getDao("topic");
  }

  async list(awid, dtoIn) {
    await SubjectmanAbl.checkInstance(
      awid,
      Errors.List.SubjectmanInstanceDoesNotExist,
      Errors.List.SubjectmanInstanceNotInProperState
    );

    // HDS 2
    let validationResult = this.validator.validate("subjectListDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );
    //TODO create object in uuBT

    // HDS 3
    dtoIn.awid = awid;

    if (!dtoIn.sortBy) dtoIn.sortBy = DEFAULTS.list.sortBy;
    if (!dtoIn.order) dtoIn.order = DEFAULTS.list.order;
    if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.list.pageSize;
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.list.pageIndex;

    let subject = await this.dao.list(dtoIn);

    // HDS 4
    subject.uuAppErrorMap = uuAppErrorMap;
    return subject;
  }

  async edit(awid, dtoIn) {
    await SubjectmanAbl.checkInstance(
      awid,
      Errors.Edit.SubjectmanInstanceDoesNotExist,
      Errors.Edit.SubjectmanInstanceNotInProperState
    );

    // HDS 2
    let validationResult = this.validator.validate("subjectEditDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.editUnsupportedKeys.code,
      Errors.Edit.InvalidDtoIn
    );
    //TODO update object in uuBT

    let subjectExist = await this.dao.get({id: dtoIn.id, awid: awid});
    if  (!subjectExist) throw new Errors.Edit.SubjectDoesNotExist({ uuAppErrorMap }, {id: dtoIn.id} )

    if (dtoIn.topicIdList){
      let topics = await this.daoTopic.getByIds( awid, dtoIn.topicIdList )
      if (topics.itemList.length < dtoIn.topicIdList.length){
        let topicIds = [];
        let missingTopic = [];
        for (const topicId of dtoIn.topicIdList){
          if (topics.itemList.find( topic => topicId==topic.id)){
            topicIds.push(topicId);
          }
          else{
            missingTopic.push(topicId);
          }
        }
        dtoIn.topicIdList=topicIds;
        if(missingTopic.length) {
          ValidationHelper.addWarning(uuAppErrorMap, WARNINGS.subjectEditTopicMissing.code, {missingTopic: missingTopic});
        }
      }
    }

    let subject;
    dtoIn.awid = awid;

    try {
      subject = await this.dao.update(dtoIn);
    } catch (e) {
      // A8
      if (e instanceof ObjectStoreError) {
        throw new Errors.Edit.TopicDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // HDS 8
    subject.uuAppErrorMap = uuAppErrorMap;
    return subject;
  }

  async remove(awid, dtoIn) {
    await SubjectmanAbl.checkInstance(
      awid,
      Errors.Remove.SubjectmanInstanceDoesNotExist,
      Errors.Remove.SubjectmanInstanceNotInProperState
    );

    // HDS 2
    let validationResult = this.validator.validate("subjectRemoveDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.removeUnsupportedKeys.code,
      Errors.Remove.InvalidDtoIn
    );
    //TODO update object in uuBT

    let subjectExist = await this.dao.get({id: dtoIn.id, awid: awid});
    if  (!subjectExist) throw new Errors.Remove.SubjectDoesNotExist({ uuAppErrorMap }, {id: dtoIn.id} )

    let topic;
    dtoIn.awid = awid;

    try {
      topic = await this.dao.delete(dtoIn);
    } catch (e) {
      // A8
      if (e instanceof ObjectStoreError) {
        throw new Errors.Remove.TopicDaoDeleteFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // HDS
    return { uuAppErrorMap };
  }

  async get(awid, dtoIn) {
    await SubjectmanAbl.checkInstance(
      awid,
      Errors.Get.SubjectmanInstanceDoesNotExist,
      Errors.Get.SubjectmanInstanceNotInProperState
    );

    // HDS 2
    let validationResult = this.validator.validate("subjectGetDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );
    //TODO create object in uuBT

    // HDS 3
    dtoIn.awid = awid;

    let subject = await this.dao.get(dtoIn);
    if (!subject) {
      // A6
      throw new Errors.Get.SubjectDaoGetFailed(uuAppErrorMap, { subjectId: dtoIn.id });
    }

    // HDS 4
    subject.uuAppErrorMap = uuAppErrorMap;
    return subject;

  }

  async create(awid, dtoIn) {
    // HDS 1
    await SubjectmanAbl.checkInstance(
      awid,
      Errors.Create.SubjectmanInstanceDoesNotExist,
      Errors.Create.SubjectmanInstanceNotInProperState
    );

    // HDS 2
    let validationResult = this.validator.validate("subjectCreateDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );
    //TODO update object in uuBT

    if (dtoIn.topicIdList){
      let topics = await this.daoTopic.getByIds( awid, dtoIn.topicIdList )
      if (topics.itemList.length < dtoIn.topicIdList.length){
        let topicIds = [];
        let missingTopic = [];
        for (const topicId of dtoIn.topicIdList){
          if (topics.itemList.find( topic => topicId==topic.id)){
            topicIds.push(topicId);
          }
          else{
            missingTopic.push(topicId);
          }
        }
        dtoIn.topicIdList=topicIds;
        if(missingTopic.length) {
          ValidationHelper.addWarning(uuAppErrorMap, WARNINGS.subjectCreateTopicMissing.code, {missingTopic: missingTopic});
        }
      }
    }

    let subject;
    dtoIn.awid = awid;

    try {
      subject = await this.dao.create(dtoIn);
    } catch (e) {
      // A8
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.subjectDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // HDS 8
    subject.uuAppErrorMap = uuAppErrorMap;
    return subject;
  }

}

module.exports = new SubjectAbl();
