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
  const [dateToRecords, setDateToRecords] = useState<
    Map<string, WorkingHourRecord[]>
  >(new Map<string, WorkingHourRecord[]>());

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
      dataIndex: "workHour",
      key: "workHour",
    },
  ];

  useEffect(() => {
    if (props.isModalOpen) {
      getWorkingHourRecords(props.member.englishName, props.projectData.project)
        .then((_records: WorkingHourRecord[]) => {
          let date_to_records = new Map<string, WorkingHourRecord[]>();
          for (let i = 0; i < _records.length; i++) {
            const dateKey = _records[i].createdAt;
            if (!date_to_records.has(dateKey)) {
              date_to_records.set(dateKey, []);
            }
            date_to_records.get(dateKey)?.push(_records[i]);
          }
          setDateToRecords(date_to_records);
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
        {Array.from(dateToRecords.entries()).map(([date, records]) => (
          <div key={date}>
            <h4>{date}</h4>
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
          </div>
        ))}
      </Modal>
    </>
  );
}

export default WorkingHourRecordsModal;
