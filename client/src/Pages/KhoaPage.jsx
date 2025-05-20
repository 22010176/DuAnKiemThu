import TableHeader from "@/Components/TableHeader";
import { faArrowRotateRight, faCheck, faPen, faPlus, faSearch, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Modal, Space, Table } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

function KhoaPage() {
  const createFormRef = useRef();
  const [createForm, setCreateForm] = useState(false)
  const [data, setData] = useState([]);

  const { current: columns } = useRef([
    { title: <TableHeader>STT</TableHeader>, dataIndex: 'stt', width: 50, render: (_, record, index) => <TableHeader>{index + 1}</TableHeader> },
    { title: <TableHeader>Mã khoa</TableHeader>, dataIndex: 'maKhoa', key: 'maKhoa', width: 70, render: i => <div className="text-lg text-center">{i}</div> },
    { title: <TableHeader>Tên khoa</TableHeader>, dataIndex: 'tenKhoa', key: 'tenKhoa', width: 120, render: i => <div className="text-lg">{i}</div> },
    { title: <TableHeader>Vị trí</TableHeader>, dataIndex: 'viTri', key: 'viTri', width: 150, render: i => <div className="text-lg">{i}</div> },
    { title: <TableHeader>Trưởng khoa</TableHeader>, dataIndex: 'truongKhoa', key: 'truongKhoa', width: 100, render: i => <div className="text-lg">{i}</div> },
    { title: <TableHeader>Tên viết tắt</TableHeader>, dataIndex: 'tenVietTat', key: 'tenVietTat', width: 80, render: i => <div className="text-lg text-center">{i}</div> },
    {
      title: <TableHeader>Tùy chọn</TableHeader>, key: 'action', width: 20,
      render: (_, entry) => (
        <div className="flex gap-5 items-center justify-center" >
          <Button variant="outlined" color="blue" icon={<FontAwesomeIcon icon={faPen} />} />
          <Button variant="outlined" color="red" icon={<FontAwesomeIcon icon={faTrash} />}
            onClick={() => axios.delete(`http://localhost:5249/Khoa/${entry.id}`).then(updateData)} />
        </div>
      ),
    },
  ]);

  async function updateData() {
    setData([])
    const response = await axios.get("http://localhost:5249/Khoa")
    setData(response.data.map((i, j) => ({ ...i, key: j })))
  }

  useEffect(function () {
    updateData()
  }, [])


  return (
    <>
      <div className="p-5 flex flex-col gap-5" >
        <div className="flex justify-end gap-2 items-center">
          <Input placeholder="Tìm kiếm" style={{ width: "200px" }} />
          <Button variant="link" color="blue" icon={<FontAwesomeIcon icon={faSearch} className="scale-150" />} onClick={() => setCreateForm(true)} />
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
        footer={[]}>
        <form ref={createFormRef} className="flex flex-col gap-5"
          onSubmit={async function (e) {
            e.preventDefault()
            const data = Object.fromEntries(new FormData(createFormRef.current))
            await axios.post('http://localhost:5249/Khoa', data)
              .then(() => updateData())
            setCreateForm(false)
            createFormRef.current.reset()
          }
          }>
          <div>
            <label className="font-semibold">Mã khoa</label>
            <Input name="maKhoa" className="pointer-events-none opacity-75" value={`MK-${data.length + 1}`} />
          </div>
          <div>
            <label className="font-semibold">Tên khoa</label>
            <Input name="tenKhoa" />
          </div>
          <div>
            <label className="font-semibold">Vị trí</label>
            <Input name="viTri" />
          </div>
          <div>
            <label className="font-semibold">Tên viết tắt</label>
            <Input name="tenVietTat" />
          </div>
          <Button htmlType="submit" className="w-min self-end" variant="solid" color="orange" icon={<FontAwesomeIcon icon={faCheck} />}>
            Hoàn thành
          </Button>
        </form>
      </Modal>
    </>
  )
}

export default KhoaPage