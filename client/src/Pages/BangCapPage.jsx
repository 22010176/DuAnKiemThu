import { faArrowRotateRight, faCheck, faPen, faPlus, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Modal, Space, Table } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";


function BangCapPage() {
  const createFormRef = useRef();
  const [createForm, setCreateForm] = useState(false)
  const [data, setData] = useState([])
  const { current: columns } = useRef([
    { title: 'STT', dataIndex: 'stt', width: 5, render: (_, record, index) => index + 1 },
    { title: 'Mã Bằng Cấp', dataIndex: 'id', key: 'id', width: 10, },
    { title: 'Tên Bằng Cấp', dataIndex: 'tenBangCap', key: 'tenBangCap', width: 100, },
    { title: 'Mô Tả', dataIndex: 'moTa', key: 'moTa', width: 150, },
    {
      title: 'Tùy chọn', key: 'action', width: 5,
      render: (_, entry) => (
        <Space size="small">
          <Button size="small" variant="outlined" color="blue" icon={<FontAwesomeIcon icon={faPen} />} />
          <Button size="small" variant="outlined" color="red" icon={<FontAwesomeIcon icon={faTrash} />}
            onClick={() => axios.delete(`http://localhost:5249/BangCap/${entry.id}`).then(updateData)} />
        </Space>
      ),
    },
  ]);

  function updateData() {
    setData([])
    axios.get('http://localhost:5249/BangCap')
      .then(function (reponse) {
        setData(reponse.data.map((i, j) => ({ ...i, key: j })))
        console.log(reponse.data)
      })
  }

  useEffect(function () {
    updateData()
  }, [])

  return (
    <>
      <div className="p-5 flex flex-col gap-5" >
        <div className="flex justify-end gap-2 items-center">
          <Input placeholder="Tìm kiếm" style={{ width: "200px" }} />
          <Button variant="link" color="orange" icon={<FontAwesomeIcon icon={faPlus} className="scale-150" />} onClick={() => setCreateForm(true)} />
          <Button variant="link" color="green" icon={<FontAwesomeIcon icon={faUpload} className="scale-150" />} />
          <Button variant="link" color="blue" icon={<FontAwesomeIcon icon={faArrowRotateRight} className="scale-150" />} onClick={updateData} />
        </div>

        <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} size="small" bordered className="shadow-md" />
      </div>

      <Modal
        title={<h1 className="text-xl font-bold text-blue-900">THÊM KHOA MỚI</h1>}
        centered
        open={createForm}
        onCancel={() => setCreateForm(false)}
        footer={[
          <Button
            variant="solid"
            color="orange"
            icon={<FontAwesomeIcon icon={faCheck} />}
            onClick={async function () {
              const data = Object.fromEntries(new FormData(createFormRef.current))
              await axios.post('http://localhost:5249/BangCap', data)
                .then(() => updateData())
              setCreateForm(false)
              createFormRef.current.reset()
            }}>
            Hoàn thành
          </Button>
        ]}>
        <form ref={createFormRef} className="flex flex-col gap-5">
          <div>
            <label className="font-semibold">Tên bằng cấp</label>
            <Input name="tenBangCap" />
          </div>
          <div>
            <label className="font-semibold">Mô tả</label>
            <Input name="moTa" />
          </div>
        </form>
      </Modal>
    </>
  )
}

export default BangCapPage