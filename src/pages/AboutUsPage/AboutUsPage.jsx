import React, { useRef } from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Breadcrumb } from 'antd';


const Wrapper = styled.div`
  position: relative;
  display: flex;
  min-height: 1000px;
`;

const Content = styled.div`
  flex: 1;
`;

const Nav = styled.nav`
  position: fixed;
  top: 27%; /* Đặt thành 50% từ phía trên của màn hình */
  right: 0;
  transform: translateY(-50%); /* Di chuyển lên trên 50% chiều cao của chính nó */
  width: 200px;
  background-color: rgba(0, 0, 0, 0.7); /* Màu nền đen với độ trong suốt */
  padding: 20px;
  height: 150px; /* Chiều cao bằng chiều cao của cửa sổ trình duyệt */
  overflow-y: auto; /* Cho phép cuộn nếu nội dung quá dài */
  box-sizing: border-box;
  ul {
    list-style-type: none; /* Loại bỏ dấu chấm từ các thẻ li */
    padding: 0;
    margin: 0;
  }
  z-index: 1000;
`;

const NavLink = styled.span`
  display: block;
  margin-bottom: 10px;
  color: #fff; /* Màu chữ trắng */
  font-size: 16px;
  cursor: pointer; /* Biến con trỏ thành pointer khi di chuột vào */
  text-decoration: none;

  &:hover {
    font-weight: bold; /* In đậm chữ khi hover */
  }
`;
const BrandWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TextContent = styled.div`
  flex: 1;
  margin-left: 50px; /* Căn trái 50px */
`;

const BrandImage = styled.img`
  width: 70%; /* Chiếm 1/2 chiều rộng */
`;

const BrandName = styled.h2`
  margin-bottom: 10px;
  // font-style: italic; /* Tạo kiểu nghiêng cho chữ */
  font-size: 30px;
`;

const BrandDescription = styled.p``;

const HistoryWrapper = styled.div`
  background-color: #000; /* Màu nền đen */
  color: #fff; /* Màu chữ trắng */
  padding: 20px;
  display: flex;
`;

const HistoryImage = styled.img`
  width: 70%; /* Chiếm 1/2 chiều rộng */
`;

const HistoryContent = styled.div`
  flex: 1;
  padding-left: 20px; /* Khoảng cách bên trái */
`;

const AboutUsPage = () => {
  const brandDescriptionRef = useRef(null);
  const historyWrapperRef = useRef(null);
  const addWrapper = useRef(null);


  const scrollToBrandDescription = () => {
    brandDescriptionRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToHistoryWrapper = () => {
    historyWrapperRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToAddWrapper = () => {
    addWrapper.current.scrollIntoView({ behavior: 'smooth' });
  };
    const bachKhoaLocation = {
    lat: 21.005189,
    lng: 105.843219,
  };
  return (
    <div>
        <Breadcrumb
                items={[
                    {
                        title: <a href="/">Trang chủ</a>,
                    },
                    {
                        title: <a href="">About us</a>,
                    }
                ]}
               style= {{ marginBottom: "25px", paddingTop: "30px", fontSize: "20px", paddingLeft: "3%" }}
            />
        <Wrapper >
       
       <Content>
         {/* <h1>About Us</h1>
         Phần nội dung thương hiệu */}
         <BrandWrapper>
           <TextContent>
             <BrandName ref={brandDescriptionRef}>TKLFASHION</BrandName>
             <BrandDescription >
 
               <div id="about">
                 <h4 style={{fontSize:"25px",fontWeight:"600", fontStyle:"italic"}}>Về Chúng Tôi:</h4>
                 <span  style={{fontSize:"14px",textAlign: "justify", display: "block"}}>TKLFASHION không chỉ là một nhãn hiệu thời trang, mà còn là một cộng đồng nơi mọi người đều được khích lệ và ủng hộ trong việc khám phá phong cách của họ. Với sự kết hợp tinh tế giữa xu hướng thời trang hiện đại và sự tỉ mỉ trong từng chi tiết, mỗi sản phẩm từ TKLFASHION đều thể hiện sự độc đáo và cá nhân hóa.</span>
               </div>
               <div id="product">
                 <h4 style={{fontSize:"25px",fontWeight:"600", fontStyle:"italic",textAlign:"center"}}>Sản Phẩm</h4>
                 <span  style={{fontSize:"14px",textAlign: "justify", display: "block"}}>Từ những bộ trang phục hàng ngày đến những trang phục dành cho các sự kiện đặc biệt, bộ sưu tập của chúng tôi mang lại sự đa dạng và phong cách cho mọi tình huống. Chúng tôi tập trung vào việc sử dụng chất liệu chất lượng cao và thiết kế sáng tạo để tạo ra những sản phẩm mang lại sự thoải mái và tự tin cho người mặc.</span>
               </div>
               <div id="misson" >
                 <h4 style={{fontSize:"25px",fontWeight:"600", fontStyle:"italic",textAlign:"center"}}>Sứ Mệnh</h4>
                 <span style={{fontSize:"14px",textAlign: "justify", display: "block"}}>Chúng tôi cam kết với việc thúc đẩy sự tự tin và cá nhân hóa thông qua thời trang. Mỗi sản phẩm từ TKLFASHION không chỉ là một món đồ mặc, mà còn là một câu chuyện về sự tự tin và phong cách riêng của bạn. Chúng tôi tin rằng mỗi người đều xứng đáng được tỏa sáng, và chúng tôi muốn làm cho điều đó trở thành hiện thực.</span>
               </div>
             </BrandDescription>
           </TextContent>
           <BrandImage src="https://file.hstatic.net/200000503583/file/ve-thiet-ke-thoi-trang_d89fb45a46224be2bda9b5bd48cd683e.jpg" alt="Your Brand Image" />
         </BrandWrapper>
         {/* Phần vùng background đen về lịch sử thương hiệu */}
         <HistoryWrapper ref={historyWrapperRef}>
           <HistoryImage src="https://dongphucphuongthao.vn/wp-content/uploads/2022/10/do-vintage-la-gi-huong-dan-phoi-do-phong-cach-vintage-cuc-xinh_2021_11_29_0.jpg" alt="History Image" />
           <HistoryContent>
             <h2 style={{fontSize:"30px",fontWeight:"600", fontStyle:"italic"}}>Lịch Sử Thương Hiệu</h2>
             <div id="start">
               <h4 style={{fontSize:"25px",fontWeight:"600", fontStyle:"italic",textAlign:"center"}} >Bắt Đầu</h4>
               <span style={{fontSize:"14px",textAlign: "justify", display: "block"}}>TKLFASHION được thành lập vào năm 2024 bởi TKL. Sứ mệnh của họ từ ngày đầu đã là tạo ra những thiết kế thời trang độc đáo và cá nhân hóa, mang lại sự tự tin cho mọi người.</span>
             </div>
             <div id="future">
               <h4 style={{fontSize:"25px",fontWeight:"600", fontStyle:"italic",textAlign:"center"}}>Tương lai</h4>
               <span style={{fontSize:"14px",textAlign: "justify", display: "block"}}>Với sứ mệnh không ngừng phát triển và cống hiến cho người tiêu dùng, TKLFASHION sẽ tiếp tục mở ra những cơ hội mới và thách thức trong tương lai. Họ cam kết tiếp tục mang lại những sản phẩm chất lượng và mang tính sáng tạo cao, đồng thời lan rộng ảnh hưởng tích cực đến cộng đồng thời trang.</span>
             </div>
           </HistoryContent>
         </HistoryWrapper>
         <div style={{ height: '400px', width: '100%' }}>
         <BrandName ref={addWrapper}>Cửa hàng của chúng tôi</BrandName>
         <MapContainer center={[bachKhoaLocation.lat, bachKhoaLocation.lng]} zoom={16} style={{ height: '400px', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[bachKhoaLocation.lat, bachKhoaLocation.lng]}>
            <Popup>
              My store
            </Popup>
          </Marker>
        </MapContainer>

     </div>
 
       </Content>
       <Nav>
         <ul>
           <li>
             <NavLink onClick={scrollToBrandDescription}>Thương hiệu</NavLink>
           </li>
           <li>
             <NavLink onClick={scrollToHistoryWrapper}>Lịch sử </NavLink>
           </li>
           <li>
             <NavLink  onClick={scrollToAddWrapper}>Vị trí</NavLink>
           </li>
         </ul>
       </Nav>
     </Wrapper>
    </div>
  
  );
};

export default AboutUsPage;

// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// const MapComponent = () => {
//   const bachKhoaLocation = {
//     lat: 21.005189,
//     lng: 105.843219,
//   };

//   return (
    
//   );
// };

// export default MapComponent;
