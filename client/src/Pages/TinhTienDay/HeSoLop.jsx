import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, ConfigProvider, Form, InputNumber, message, Modal, Popconfirm, Select, Space, Table, Tag } from 'antd';
import { useWatch } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';

import { CreateHeSoBangCap, GetHeSoBangCapNam } from '@/api/heSoBangCapApi';
import { CreateHeSoLopHocPhan, DeleteHeSoLopHocPhan, GetHeSoLopHocPhan, GetHeSoLopHocPhanTheoNam, UpdateHeSoLopHocPhan } from '@/api/heSoLopHocPhan';
import { GetNamHocList } from '@/api/lhpThongKeApi';

const colors = [
  '#E07502', '#C00EB2', '#19A10A', '#EA1D20'
]

function HeSoBangCap(value, colors = [], range = []) {
  const colorNum = colors.length
  const div = Math.abs(range[1] - range[0]) / colorNum
  const min = Math.min(...range)
  const steps = new Array(colorNum).fill(0).map((_, i) => min + i * div)
  return steps.findIndex(i => i >= value)
}

function HeSoLop() {
  const [modalVisible, setModalVisible] = useState(false);
  const [heSoLop, setHeSoLop] = useState([])
  const [heSoLopId, setHeSoLopId] = useState()
  const [modalType, setModalType] = useState('');

  const [editHeSoBangCap, setEditHeSoBangCap] = useState()

  const [namHoc, setNamHoc] = useState([])
  const [selectedNamHoc, setSelectedNamHoc] = useState()

  const [heSoBangCap, setHeSoBangCap] = useState([])
  const [heSo, setHeSo] = useState(0)

  const [form] = Form.useForm();
  const formData = useWatch(i => i, form)

  useEffect(function () {
    GetHeSoBangCapNam({ nam: selectedNamHoc || new Date().getFullYear() })
      .then(setHeSoBangCap)

    GetHeSoLopHocPhanTheoNam({ nam: selectedNamHoc || new Date().getFullYear() })
      .then(setHeSoLop)
  }, [selectedNamHoc])

  useEffect(function () {
    GetHeSoLopHocPhan().then(setHeSoLop)

    GetNamHocList().then(async data => {
      setNamHoc(data)
      setSelectedNamHoc(data[0].nam || new Date().getFullYear())
    })

    GetHeSoBangCapNam({ nam: new Date().getFullYear() }).then(setHeSoBangCap)
  }, [])

  const heSoColumns = [
    { title: 'Số sinh viên', dataIndex: 'soHocSinhToiThieu', key: 'soHocSinhToiThieu', },
    {
      title: 'Hệ số', dataIndex: 'heSo', key: 'heSo',
      render: (value) => (
        <Tag color={colors[HeSoBangCap(value, colors, [-1, 3])]}>
          {value > 0 ? '+' : ''}{value}
        </Tag>
      )
    },
    {
      title: 'Thao tác', key: 'action',
      render: (_, item) => (
        <Space>
          <Button variant="outlined" color="blue" icon={<FontAwesomeIcon icon={faPen} />} onClick={() => {
            form.setFieldValue('heSo', item.heSo)
            form.setFieldValue('soHocSinhToiThieu', item.soHocSinhToiThieu)

            setHeSoLopId(item.id)
            setModalType('edit')
            setModalVisible(true)
          }} />
          <Popconfirm title="Bạn có chắc chắn muốn xóa?" okText="Có" cancelText="Không"
            onConfirm={async () => {
              await DeleteHeSoLopHocPhan({ id: item.id })
              GetHeSoLopHocPhan().then(setHeSoLop)
              message.info("Xoá hệ số thành công!")
            }}>
            <Button variant="outlined" color="red" icon={<FontAwesomeIcon icon={faTrash} />} />
          </Popconfirm>
        </Space >
      ),
    },
  ];
  const bangCapColumns = [
    { title: 'Tên bằng cấp', dataIndex: 'tenBangCap', key: 'tenBangCap', },
    {
      title: 'Hệ số', dataIndex: 'heSo', key: 'heSo',
      render: (value, entry) => entry.bangCapId == editHeSoBangCap?.bangCapId ?
        <InputNumber style={{ width: '100%' }} step={0.1} min={-1} max={3} value={heSo} onChange={setHeSo} /> :
        <Tag color={colors[HeSoBangCap(value, colors, [-1, 3])]}>{value > 0 ? '+' : ''}{value == -1 ? 1 : value}</Tag>
    },
    {
      title: 'Thao tác', key: 'action',
      render: (_, entry) => (
        <Space>
          {(entry.id == editHeSoBangCap?.id) ?
            <Button size="small" onClick={async () => {
              await CreateHeSoBangCap({ id: "", maBangCap: editHeSoBangCap.bangCapId, nam: selectedNamHoc, heSo })
              await GetHeSoBangCapNam({ nam: selectedNamHoc }).then(setHeSoBangCap)
              message.info("Cập nhật hệ số bằng cấp thành công")
              setEditHeSoBangCap()
            }}>Lưu</Button> :
            <Button disabled={editHeSoBangCap != null} variant="outlined" color="blue" icon={<FontAwesomeIcon icon={faPen} />} onClick={() => {
              setEditHeSoBangCap(entry)
              setHeSo(entry.heSo)
            }} />}
        </Space >
      ),
    },
  ];

  const handleModalOk = () => {
    form.validateFields().then(async () => {
      setModalVisible(false);
      try {
        if (modalType == 'add') {
          await CreateHeSoLopHocPhan({ ...formData, namHoc: selectedNamHoc })
          message.info("Tạo hệ số lớp mới thành công!")
        } else if (modalType == 'edit') {
          await UpdateHeSoLopHocPhan({ id: heSoLopId, ...formData, namHoc: selectedNamHoc })
          message.info("Cập nhật hệ số lớp mới thành công!")
        }
      } catch {
        message.error("Thao tác thất bại!")
      }
      await GetHeSoLopHocPhanTheoNam({ nam: selectedNamHoc }).then(setHeSoLop)
      setHeSoLopId()
      form.resetFields();
    });
  };

  return (
    <>
      <div className='grid grid-cols-2 gap-5 p-5'>
        <Select className='w-50 col-span-2'
          value={selectedNamHoc}
          onChange={e => setSelectedNamHoc(e)}
          options={namHoc.map(i => ({
            value: i.nam,
            label: `${i.nam}-${i.nam + 1}`
          }))} />
        <ConfigProvider
          theme={{
            components: {
              Table: {
                borderColor: "#000000",
                colorPrimaryBorder: "#000000",
              }
            }
          }}>
          <Card
            title={
              <div className='flex justify-between'>
                <p className='text-xl font-bold'>Hệ số lớp</p>
                <Button icon={<FontAwesomeIcon icon={faPlus} />}
                  type="primary" onClick={() => {
                    setModalType('add');
                    setModalVisible(true);
                  }}>Thêm hệ số</Button>
              </div>
            }>
            <Table
              pagination={false} size="small" bordered
              columns={heSoColumns}
              dataSource={heSoLop} />
            {/* <Divider type="vertical" /> */}
          </Card>
          {/* <div className='flex flex-col gap-5'> */}
          <Card title={
            <div className='flex justify-between'>
              <p className='text-xl font-bold'>Hệ số bằng cấp</p>
            </div>
          }>
            <Table bordered size="small" pagination={false}
              columns={bangCapColumns}
              dataSource={heSoBangCap?.filter(i => i.nam == selectedNamHoc)} />
          </Card>
          {/* </div> */}
        </ConfigProvider>
      </div>
      <Modal
        open={modalVisible}
        onOk={handleModalOk}
        title={modalType === 'edit' ? 'Cập nhật hệ số lớp' : 'Thêm hệ số lớp'}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        width={500}>
        <Form form={form} layout="vertical">
          <Form.Item label="Số sinh viên" name="soHocSinhToiThieu" rules={[{ required: true, message: 'Vui lòng nhập khoảng sinh viên!' }]}>
            <InputNumber style={{ width: '100%' }} min={0} max={150} />
          </Form.Item>
          <Form.Item label="Hệ số" name="heSo" rules={[{ required: true, message: 'Vui lòng nhập hệ số!' }]}>
            <InputNumber style={{ width: '100%' }} step={0.1} min={-1} max={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default HeSoLop;