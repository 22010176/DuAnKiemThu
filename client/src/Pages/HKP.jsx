import TableHeader from "@/Components/TableHeader";
import { getNextIdNumber } from "@/Utils/FormUtils";
import { faArrowRotateRight, faCheck, faPen, faPlus, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, message, Modal, Popconfirm, Table } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

function HKP() {
  const [messageApi, contextHolder] = message.useMessage();
  const [form, setForm] = useState({
    maKi: "",
    tenKi: "",
    namHoc: "",
    ngayBatDau: "",
    ngayKetThuc: "",
  })
  const createFormRef = useRef();
  const [createForm, setCreateForm] = useState(false)
  const [mode, setMode] = useState('create')
  const [data, setData] = useState([])


  const success = (content) => {
    messageApi.open({ type: 'success', content });
  };

  const error = m => messageApi.open({ type: 'error', content: m, });


  // const warning = () => {
  //   messageApi.open({
  //     type: 'warning',
  //     content: 'This is a warning message',
  //   });
  // };

  const columns = [
    {
      title: <TableHeader>STT</TableHeader>,
      dataIndex: 'stt', width: 5,
      render: (_, record, index) => <TableHeader>{index + 1}</TableHeader>
    },
    {
      title: () => <TableHeader>Tên kì</TableHeader>, dataIndex: 'tenKi', key: 'tenKi', width: 120,
      render: i => <div className="text-lg text-center">{i}</div>
    },
    {
      title: () => <TableHeader>Năm học</TableHeader>, dataIndex: 'namHoc', key: 'namHoc', width: 400,
      render: i => <div className="text-lg text-center">{i}</div>
    },
    {
      title: () => <TableHeader>Ngày bắt đầu</TableHeader>, dataIndex: 'ngayBatDau', key: 'ngayBatDau', width: 120,
      render: i => <div className="text-lg text-center">{i}</div>
    },
    {
      title: () => <TableHeader>Ngày kết thúc</TableHeader>, dataIndex: 'ngayKetThuc', key: 'ngayKetThuc', width: 120,
      render: i => <div className="text-lg text-center">{i}</div>
    },
    {
      title: () => <TableHeader>Tùy chọn</TableHeader>, key: 'action', width: 100,
      render: (_, entry) => (
        <div className="flex gap-5 items-center justify-center" >
          <Button variant="outlined" color="blue" icon={<FontAwesomeIcon icon={faPen} />}
            onClick={async () => {
              setCreateForm(true)
              setMode("edit")
              setForm({
                tenKi: entry.tenKi,
                namHoc: entry.namHoc,
                ngayBatDau: entry.ngayBatDau,
                ngayKetThuc: entry.ngayKetThuc,
                id: entry.id
              })
            }} />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa kì học này không?"
            description="Kì học này sẽ bị xóa vĩnh viễn!"
            placement="left"
            onConfirm={() => axios.delete(`http://localhost:5249/KiHoc/${entry.id}`).then(() => {
              updateData()
              success("Xoá kì học thành công!")
            })}>
            <Button variant="outlined" color="red" icon={<FontAwesomeIcon icon={faTrash} />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  function updateData() {
    setData([])
    axios.get('http://localhost:5249/KiHoc')
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
      {contextHolder}
      <div className="p-5 flex flex-col gap-5" >
        <div className="flex justify-end gap-2 items-center">
          <Button variant="link" color="orange" icon={<FontAwesomeIcon icon={faPlus} className="scale-150" />} onClick={() => {
            setCreateForm(true)
            setMode('create')
            setForm(d => ({ ...d, maBangCap: `BC-${getNextIdNumber(data.map(i => i.maBangCap))}` }))
          }} />
          <Button variant="link" color="green" icon={<FontAwesomeIcon icon={faUpload} className="scale-150" />} onClick={() => {
          }} />
          <Button variant="link" color="blue" icon={<FontAwesomeIcon icon={faArrowRotateRight} className="scale-150" />} onClick={updateData} />
        </div>

        <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} size="small" bordered className="shadow-md" />
      </div>

      <Modal
        title={<h1 className="text-xl font-bold text-blue-900">THÊM KÌ HỌC MỚI</h1>}
        centered
        open={createForm}
        onCancel={() => setCreateForm(false)}
        footer={[]}>
        <form
          ref={createFormRef} className="flex flex-col gap-5"
          onSubmit={async function (e) {
            e.preventDefault()
            const elem = e.target;
            const data = Object.fromEntries(new FormData(elem))
            data.maBangCap = ""
            if (mode === 'create')
              await axios.post('http://localhost:5249/KiHoc', data)
                .then(() => updateData())
                .then(success.bind({}, "Thêm kì học thành công!"))
                .then(() => {
                  setForm({ tenKi: "", namHoc: "", ngayBatDau: "", ngayKetThuc: "", })
                  setCreateForm(false)
                })
                .catch(res => error(res.response.data))

            else if (mode === 'edit') {
              await axios.put('http://localhost:5249/KiHoc', form)
                .then(() => updateData())
                .then(success.bind({}, "Cập nhật kì học thành công!"))
                .then(() => {
                  setForm({ tenKi: "", namHoc: "", ngayBatDau: "", ngayKetThuc: "", })
                  setCreateForm(false)
                })
                .catch(res => error(res.response.data))
            }
          }}>
          {/* <div>
            <label className="font-semibold">Mã kì học</label>
            <Input required name="maBangCap" className="pointer-events-none opacity-75" value={form.maBangCap} onChange={e => setForm(d => ({ ...d, maBangCap: e.target.value }))} />
          </div> */}
          <div>
            <label className="font-semibold">Tên kì</label>
            <Input required name="tenKi" value={form.tenKi} onChange={e => setForm(d => ({ ...d, tenKi: e.target.value }))} />
          </div>
          <div>
            <label className="font-semibold">Năm học</label>
            <Input maxLength={10} showCount required name="namHoc" value={form.namHoc} onChange={e => setForm(d => ({ ...d, namHoc: e.target.value }))} />
          </div>
          <div>
            <label className="font-semibold">Ngày bắt đầu</label>
            <Input maxLength={10} showCount required name="ngayBatDau" value={form.ngayBatDau} onChange={e => setForm(d => ({ ...d, ngayBatDau: e.target.value }))} />
          </div>
          <div>
            <label className="font-semibold">Ngày kết thúc</label>
            <Input maxLength={10} showCount required name="ngayKetThuc" value={form.ngayKetThuc} onChange={e => setForm(d => ({ ...d, ngayKetThuc: e.target.value }))} />
          </div>
          <Button htmlType="submit" className="w-min self-end" variant="solid" color="orange" icon={<FontAwesomeIcon icon={faCheck} />}>
            Hoàn thành
          </Button>
        </form>
      </Modal >
    </>
  )
}

export default HKP