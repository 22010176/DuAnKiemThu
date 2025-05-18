import { faArrowRotateRight, faCheck, faPen, faPlus, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Modal, Space, Table, Form, Card, Row, Col, Select, DatePicker, Radio, Flex } from "antd";
import { useEffect, useRef, useState } from "react";
import { BarChartOutlined, CalendarOutlined, DotChartOutlined, LineChartOutlined, PieChartOutlined, SaveOutlined } from '@ant-design/icons';
import axios from "axios";
function GiaoVienPage() {
  const createFormRef = useRef();
  const [createForm, setCreateForm] = useState(false)
  const [data, setData] = useState([])
  const columns = [
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
  ];

  function updateData() {
    setData([])
    // axios.get('http://localhost:5249/BangCap')
    //   .then(function (reponse) {
    //     setData(reponse.data.map((i, j) => ({ ...i, key: j })))
    //     console.log(reponse.data)
    //   })
  }
  const [formInstance] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);
  };
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
        footer={[]}>
        <form ref={createFormRef} className="grid gap-5 grid-cols-[2fr_3fr]"
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
            <label className="font-semibold">Mã giáo viên</label>
            <Input name="maKhoa" className="pointer-events-none opacity-75" value={`MK-${data.length + 1}`} />
          </div>
          <div >
            <label className="font-semibold">Khoa</label>
            <br />
            <Select
              className="w-full"
              defaultValue="lucy"
              options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
              ]} />
          </div>
          <div className="col-span-2">
            <label className="font-semibold">Họ tên</label>
            <Input name="viTri" />
          </div>

          <div>
            <label className="mb-5 font-semibold">Giới tính</label>
            <br />
            <Radio.Group
              className="w-full"
              options={[
                { value: 1, label: "Nam" },
                { value: 2, label: "Nữ" }
              ]} />
          </div>
          <div>
            <label className="font-semibold">Ngày sinh</label>
            <br />
            <DatePicker name="moTa" className="w-full" />
          </div>
          <div>
            <label className="font-semibold">Số điện thoại</label>
            <Input name="soDienThoai" />
          </div>
          <div>
            <label className="font-semibold">Mail</label>
            <Input name="mail" />
          </div>
          <div>
            <label className="font-semibold">Học hàm</label>
            <Input name="bangCap" />
          </div>
          <div>
            <label className="font-semibold">Chức vụ</label>
            <Select
              className="w-full"
              defaultValue="lucy"

              options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'disabled', label: 'Disabled', disabled: true },
              ]} />
          </div>
          <div className="col-span-2 flex justify-end">
            <Button htmlType="submit" className="w-min" variant="solid" color="orange" icon={<FontAwesomeIcon icon={faCheck} />}>
              Hoàn thành
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default GiaoVienPage