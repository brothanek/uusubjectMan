import React from "react";
import UU5 from "uu5g04";
import { useDataList, useRef, useCallback, useUnmountedRef } from "uu5g04-hooks";
import Calls from "calls";
import { useLsi } from "uu5g04-hooks";
import Lsi from "../../../config/lsi";
import ContentCreate from "../content_create/ContentCreate";

function ContentList() {
  const modalRef = useRef();
  const alertBusRef = useRef();
  const unmountedRef = useUnmountedRef();
  const pageSize = 8;
  const dataListResult = useDataList({
    pageSize,
    handlerMap: {
      load: Calls.listContents,
      createItem: Calls.createContent,
    },
    itemHandlerMap: {
      delete: Calls.deleteContent,
    },
  });
  const header = useLsi(Lsi.subject.subjectList.header);
  const name = useLsi(Lsi.common.name);

  const showModal = useCallback((onSave) => {
    const modal = modalRef.current;
    modal.open({
      header: "Create Content",
      content: <ContentCreate onSave={onSave} modal={modal} />,
    });
  }, []);

  const handleCreate = useCallback(() => {
    showModal(async ({ component, values }) => {
      let data, error;
      try {
        console.log(dataListResult);
        data = await dataListResult.handlerMap.createItem(values);
      } catch (e) {
        console.warn(e);
        error = e;
      }
      if (unmountedRef.current) return;
      if (error) component.saveFail(error);
      else component.saveDone(data);
    });
  }, [showModal, unmountedRef, dataListResult]);

  if (dataListResult?.state !== "ready") return <UU5.Bricks.Loading />;

  return (
    <div>
      <UU5.Bricks.Button onClick={handleCreate} content={"Add new Digital content"} />
      {dataListResult?.data.length < 1 ? (
        <h1>{"There are no data to load :("}</h1>
      ) : (
        <UU5.Bricks.Table hover condensed header={header}>
          <UU5.Bricks.Table.THead>
            <UU5.Bricks.Table.Tr>
              <UU5.Bricks.Table.Th content={name} />
              <UU5.Bricks.Table.Th content="Content type" />
              <UU5.Bricks.Table.Th content="Link" />
              <UU5.Bricks.Table.Th content="Manage" />
            </UU5.Bricks.Table.Tr>
          </UU5.Bricks.Table.THead>

          <UU5.Bricks.Table.TBody>
            {(dataListResult?.data || []).map(({ data, handlerMap }) => {
              const { contentName = "", contentType = "", link = "" } = data;
              return (
                <UU5.Bricks.Table.Tr key={data}>
                  <UU5.Bricks.Table.Td
                    content={
                      <UU5.Bricks.Link
                        onClick={() => UU5.Environment.getRouter().setRoute("content", data)}
                        content={contentName}
                      />
                    }
                  />
                  <UU5.Bricks.Table.Td content={contentType} />
                  <UU5.Bricks.Table.Td
                    style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                    content={<a href={link}>{link} </a>}
                  />
                  <UU5.Bricks.Table.Td
                    content={<UU5.Bricks.Button onClick={() => handlerMap.delete()} content={"Delete"} />}
                  />
                </UU5.Bricks.Table.Tr>
              );
            })}
          </UU5.Bricks.Table.TBody>
        </UU5.Bricks.Table>
      )}
      <UU5.Bricks.Modal controlled={false} ref={modalRef} mountContent="onEachOpen" />
      <UU5.Bricks.AlertBus ref={alertBusRef} />
    </div>
  );
}

export default ContentList;
