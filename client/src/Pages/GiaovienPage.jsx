import { faArrowRotateRight, faCheck, faPen, faPlus, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Modal, Space, Table } from "antd";
import { useEffect, useRef, useState } from "react";

function GiaoVienPage() {
  const createFormRef = useRef();
  const [createForm, setCreateForm] = useState(false)
  const [data, setData] = useState([])
  const { current: columns } = useRef([
    { title: 'STT', dataIndex: 'stt', width: 5, render: (_, record, index) => index + 1 },
    { title: 'Mã Giảng Viên', dataIndex: 'id', key: 'id', width: 100, },
    { title: 'Tên Giảng Viên', dataIndex: 'tenGiangVien', key: 'tenGiangVien', width: 200, },
    { title: 'Giới Tính', dataIndex: 'gioiTinh', key: 'gioiTinh', width: 50, },
    { title: 'Ngày Sinh', dataIndex: 'sinhNhat', key: 'sinhNhat', width: 100, },
    { title: 'Số Điện Thoại', dataIndex: 'soDienThoai', key: 'soDienThoai', width: 100, },
    { title: 'Mail', dataIndex: 'mail', key: 'mail', width: 200, },
    {
      title: 'Chức Vụ', dataIndex: 'chucVu', key: 'chucVu', width: 100,
      render: (_, entry) => {
        return "Test"
      }
    },
    { title: 'Bằng Cấp', dataIndex: 'moTa', key: 'moTa', width: 100, },
    {
      title: 'Tùy chọn', key: 'action', width: 5,
      render: (_, entry) => (
        <Space size="small">
          <Button size="small" variant="outlined" color="blue" icon={<FontAwesomeIcon icon={faPen} />} />
          <Button size="small" variant="outlined" color="red" icon={<FontAwesomeIcon icon={faTrash} />}
            onClick={() => { }} />
        </Space>
      ),
    },
  ]);

  function closeForm() {
    createFormRef.current.reset();
    setCreateForm(false)
  }

  function updateData() {
    setData([])
    // axios.get('http://localhost:5249/BangCap')
    //   .then(function (reponse) {
    //     setData(reponse.data.map((i, j) => ({ ...i, key: j })))
    //     console.log(reponse.data)
    //   })
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
        onCancel={closeForm}
        footer={[
          <Button
            variant="solid"
            color="orange"
            icon={<FontAwesomeIcon icon={faCheck} />}
            onClick={async function () {
              const data = Object.fromEntries(new FormData(createFormRef.current))
              // await axios.post('http://localhost:5249/BangCap', data)
              //   .then(() => updateData())
              closeForm()
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

export default GiaoVienPage