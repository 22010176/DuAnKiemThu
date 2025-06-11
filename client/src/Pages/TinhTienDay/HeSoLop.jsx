import { Button, Card, ConfigProvider, Form, InputNumber, message, Modal, Select, Space, Table, Tag } from 'antd';
import { useWatch } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';

import { CreateHeSoBangCap, GetHeSoBangCapNam } from '@/api/heSoBangCapApi';
import { CreateHeSoLopHocPhan, GetHeSoLopHocPhan, UpdateHeSoLopHocPhan } from '@/api/heSoLopHocPhan';
import { GetNamHocList } from '@/api/lhpThongKeApi';

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
    GetHeSoBangCapNam({ nam: selectedNamHoc }).then(setHeSoBangCap)
  }, [selectedNamHoc])

  useEffect(function () {
    GetHeSoLopHocPhan().then(setHeSoLop)

    GetNamHocList().then(async data => {
      setNamHoc(data)
      setSelectedNamHoc(data[0].nam)
    })

    GetHeSoBangCapNam({ nam: new Date().getFullYear() }).then(setHeSoBangCap)
  }, [])

  const heSoColumns = [
    { title: 'Số sinh viên', dataIndex: 'soHocSinhToiThieu', key: 'soHocSinhToiThieu', },
    {
      title: 'Hệ số', dataIndex: 'heSo', key: 'heSo',
      render: (value) => (
        <Tag color={value < 0 ? 'red' : value > 0 ? 'green' : 'blue'}>
          {value > 0 ? '+' : ''}{value}
        </Tag>
      )
    },
    {
      title: 'Thao tác', key: 'action',
      render: (_, item) => (
        <Space>
          <Button size='small' onClick={() => {
            form.setFieldValue('heSo', item.heSo)
            form.setFieldValue('soHocSinhToiThieu', item.soHocSinhToiThieu)

            setHeSoLopId(item.id)
            setModalType('edit')
            setModalVisible(true)
          }}>
            Sửa
          </Button>
        </Space >
      ),
    },
  ];
  const bangCapColumns = [
    { title: 'Tên bằng cấp', dataIndex: 'tenBangCap', key: 'tenBangCap', },
    {
      title: 'Hệ số', dataIndex: 'heSo', key: 'heSo',
      render: (value, entry) => entry.bangCapId == editHeSoBangCap?.bangCapId ?
        <InputNumber value={heSo} onChange={setHeSo} /> :
        (
          <Tag color='blue-inverse'>
            {value == -1 ? 1 : value}
          </Tag>
        )
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
            <Button disabled={editHeSoBangCap != null} size="small" onClick={() => {
              setEditHeSoBangCap(entry)
              setHeSo(entry.heSo)
            }}>Sửa</Button>}
        </Space >
      ),
    },
  ];

  const handleModalOk = () => {
    form.validateFields().then(async () => {
      setModalVisible(false);
      console.log(formData)
      try {
        if (modalType == 'add') {
          await CreateHeSoLopHocPhan(formData)
          message.info("Tạo hệ số lớp mới thành công!")

        }
        else if (modalType == 'edit') {
          await UpdateHeSoLopHocPhan({ id: heSoLopId, ...formData })
          message.info("Cập nhật hệ số lớp mới thành công!")
        }
      } catch (error) {
        message.error("Thao tác thất bại!")
      }
      await GetHeSoLopHocPhan().then(setHeSoLop)
      setHeSoLopId()
      form.resetFields();
    });
  };

  return (
    <>
      <div className='grid grid-cols-2 gap-10 p-5'>
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
              <Button type="primary" onClick={() => {
                setModalType('add');
                setModalVisible(true);
              }}>Thêm hệ số</Button>}>
            <Table
              pagination={false} size="small" bordered
              columns={heSoColumns}
              dataSource={heSoLop} />
            {/* <Divider type="vertical" /> */}
          </Card>
          <div className='flex flex-col gap-5'>
            <Select className='w-50'
              value={selectedNamHoc}
              onChange={e => setSelectedNamHoc(e)}
              options={namHoc.map(i => ({ value: i.nam, label: `${i.nam}-${i.nam + 1}` }))} />
            <Card>
              <Table bordered size="small" pagination={false}
                columns={bangCapColumns}
                dataSource={heSoBangCap?.filter(i => i.nam == selectedNamHoc)} />
            </Card>
          </div>
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
            <InputNumber style={{ width: '100%' }} min={0} max={150} placeholder="Ví dụ: 80-89" />
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