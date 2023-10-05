import { Button, Input, Alert } from "antd";
import React, { useState, useRef } from "react";
import { Job } from "../entities/Job";

const TodoForm: React.FC = () => {
  const [showErr, setShowErr] = useState(false);
  const [job, setJob] = useState<any>("");
  const inputRef = useRef<any>();
  const [jobs, setJobs] = useState(() => {
    const jobLocal = JSON.parse(localStorage.getItem("jobs") || "[]");
    return jobLocal;
  });

  const validateDate = (name: string, value: string) => {
    if (name === "job") {
      if (!value) {
        setShowErr(true);
      } else {
        setShowErr(false);
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    validateDate(name, value);
    setJob({
      ...job,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!job.job) {
      return setShowErr(true);
    }

    const newJob: Job = {
      id: Math.ceil(Math.random() * 1000),
      name: job.job,
      status: false,
    };

    setJobs([...jobs, newJob]);
    localStorage.setItem("jobs", JSON.stringify([...jobs, newJob]));
    setJob("");

    inputRef.current!.focus();
  };

  const handleDelete = (id: number) => {
    const updatedJobs = jobs.filter((job: Job) => job.id !== id);
    setJobs(updatedJobs);

    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  const handleUpdateJob = (id: number) => {
    const updatedJobs = jobs.map((job: Job) => {
      if (job.id === id) {
        return {
          ...job,
          status: !job.status,
        };
      }
      return job;
    });
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  return (
    <div>
      <div>
        <h3 className="text-2xl font-bold text-center">Danh sách công việc</h3>
        <form onSubmit={handleSubmit} className="flex gap-1 mb-2">
          <Input
            ref={inputRef}
            name="job"
            onChange={handleChange}
            // onBlur={(e) => validateDate(e.target.name, e.target.value)}
            placeholder="Nhập thử công việc ...."
            value={job.job}
          />
          <Button htmlType="submit" type="primary" className="bg-blue-600">
            ADD
          </Button>
        </form>
        {showErr ? (
          <Alert
            message="Tên công việc không được để trống "
            type="error"
            showIcon
          />
        ) : (
          <></>
        )}
      </div>
      {jobs.length > 0 ? (
        <>
          {jobs.map((job: Job) => (
            <div className="border shadow mt-2">
              <div className="flex justify-between items-center p-1 ">
                <div className="flex items-center gap-2">
                  <input
                    checked={job.status}
                    onClick={() => handleUpdateJob(job.id)}
                    type="checkbox"
                    className="h-6"
                  />
                  {job.status ? <s>{job.name}</s> : <span>{job.name}</span>}
                </div>
                <Button onClick={() => handleDelete(job.id)} danger>
                  Xóa
                </Button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="border shadow mt-2">
            <div className="flex justify-center items-center p-3">
              <h3 className="text-center">chưa có công việc</h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoForm;
