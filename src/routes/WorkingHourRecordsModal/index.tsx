import React, { useEffect, useState } from "react";
import { Modal, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { getWorkingHourRecords } from "../../lib/api";
import { MemberData, ProjectData, WorkingHourRecord } from "../../lib/models";
import "./styles.css";

function WorkingHourRecordsModal(props: {
  isModalOpen: boolean;
  setIsModalOpen: CallableFunction;
  projectData: ProjectData;
  member: MemberData;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const [records, setRecords] = useState<WorkingHourRecord[]>([]);

  const columns: TableProps<WorkingHourRecord>["columns"] = [
    {
      title: "Deliverable",
      dataIndex: "deliverable",
      key: "deliverable",
    },
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
    },
    {
      title: "Work hour",
      dataIndex: "work_hour",
      key: "work_hour",
    },
  ];

  useEffect(() => {
    if (props.isModalOpen) {
      getWorkingHourRecords(props.member.englishName, props.projectData.project)
        .then((value: WorkingHourRecord[]) => {
          setRecords(value);
        })
        .catch((error: any) => {})
        .finally(() => {
          setLoading(false);
        });
    }
  }, [props.setIsModalOpen, props.isModalOpen]);

  const handleCancel = () => {
    props.setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Working hour records"
        open={props.isModalOpen}
        onCancel={handleCancel}
        loading={loading}
        footer={<></>}
        className="modal"
        centered={true}
      >
        <Table
          columns={columns}
          dataSource={records.map((item, index) => ({
            ...item,
            key: index,
          }))}
          pagination={false}
          size="small"
          className="custom-table"
        />
      </Modal>
    </>
  );
}

export default WorkingHourRecordsModal;
