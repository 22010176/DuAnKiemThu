import TableHeader from "@/Components/TableHeader";
import { getNextIdNumber } from "@/Utils/FormUtils";
import { faArrowRotateRight, faCheck, faPen, faPlus, faSearch, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, message, Modal, Space, Table } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

function KhoaPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const createFormRef = useRef();
  const [createForm, setCreateForm] = useState(false)
  const [form, setForm] = useState({
    maKhoa: "",
    tenKhoa: "",
    viTri: "",
    tenVietTat: ""
  })
  const [mode, setMode] = useState("create")
  const [data, setData] = useState([]);
  const success = m => {
    messageApi.open({
      type: 'success',
      content: m,
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'This is an error message',
    });
  };

  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'This is a warning message',
    });
  };
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
          <Button variant="outlined" color="blue" icon={<FontAwesomeIcon icon={faPen} />}
            onClick={function (e) {
              console.log(entry)
              setMode("update")
              setCreateForm(true)
              setForm({
                maKhoa: entry.maKhoa,
                tenKhoa: entry.tenKhoa,
                viTri: entry.viTri,
                tenVietTat: entry.tenVietTat,
                id: entry.id
              })
            }} />
          <Button variant="outlined" color="red" icon={<FontAwesomeIcon icon={faTrash} />}
            onClick={() => axios.delete(`http://localhost:5249/Khoa/${entry.id}`).then(e => {
              updateData()
              success("Xoá khoa thành công!")
            })} />
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
      {contextHolder}
      <div className="p-5 flex flex-col gap-5" >
        <div className="flex justify-end gap-2 items-center">
          <Input placeholder="Tìm kiếm" style={{ width: "200px" }} />
          <Button variant="link" color="blue" icon={<FontAwesomeIcon icon={faSearch} className="scale-150" />} />
          <Button variant="link" color="orange" icon={<FontAwesomeIcon icon={faPlus} className="scale-150" />} onClick={() => {
            setMode("create")
            setForm(d => ({ ...d, maKhoa: `K-${getNextIdNumber(data.map(i => i.maKhoa))}` }))
            setCreateForm(true)
          }} />
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
            if (mode === 'create') {
              await axios.post('http://localhost:5249/Khoa', data)
              success("Thêm khoa thành công!")
            }
            else if (mode === 'update') {
              await axios.put('http://localhost:5249/Khoa', form)
              success("Sửa thông tin của Khoa thành công!")
            }
            await updateData()
            setCreateForm(false)
            setForm({ maKhoa: "", tenKhoa: "", viTri: "", tenVietTat: "" })
          }
          }>
          <div>
            <label className="font-semibold">Mã khoa</label>
            <Input required name="maKhoa" className="pointer-events-none opacity-75" value={form.maKhoa} />
          </div>
          <div>
            <label className="font-semibold">Tên khoa</label>
            <Input required name="tenKhoa" value={form.tenKhoa} onChange={e => setForm(d => ({ ...d, tenKhoa: e.target.value }))} />
          </div>
          <div>
            <label className="font-semibold">Vị trí</label>
            <Input required name="viTri" value={form.viTri} onChange={e => setForm(d => ({ ...d, viTri: e.target.value }))} />
          </div>
          <div>
            <label className="font-semibold">Tên viết tắt</label>
            <Input required name="tenVietTat" value={form.tenVietTat} onChange={e => setForm(d => ({ ...d, tenVietTat: e.target.value }))} />
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