import { Tabs } from 'antd';

import DinhMucTien from './Components/DinhMucTien';
import HeSoLop from './Components/HeSoLop';
import TienDayGiangVien from './Components/TienDayGiangVien';

const { TabPane } = Tabs;

const TinhTienDay = () => {
  return (
    <div className="p-5">
      <Tabs defaultActiveKey="1">
        <TabPane key="1" tab={<span><i className="fas fa-money-bill-wave"></i> Định mức tiền</span>} >
          <DinhMucTien />
        </TabPane>

        <TabPane key="2" tab={<span><i className="fas fa-users"></i> Hệ số lớp</span>} >
          <HeSoLop />
        </TabPane>

        <TabPane key="3" tab={<span><i className="fas fa-calculator"></i> Tính tiền dạy</span>}>
          <TienDayGiangVien />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TinhTienDay;