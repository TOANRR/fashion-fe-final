import React, { useState, useEffect } from 'react';
import { Form, Input, Rate, Checkbox, Button, List, Modal, Table } from 'antd';
import './ProductReviewForm.css'; // Import CSS file for styling

const { TextArea } = Input;

const ProductReviewForm = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái cho biết modal có hiển thị hay không
  const [submitting, setSubmitting] = useState(false);
  const [comments, setComments] = useState([]); // Mảng chứa các bình luận
  const rowClassName = () => 'custom-table-row';
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible); // Đảo ngược trạng thái hiển thị modal
  };

  const onFinish = (values) => {
    setSubmitting(true);
    console.log('Received values of form:', values);
    // Gửi dữ liệu đánh giá và nhận xét lên server

    // Thêm bình luận mới vào mảng bình luận
    setComments([...comments, values]);

    // Reset form
    form.resetFields();
    setSubmitting(false);
    toggleModal(); // Đóng modal sau khi gửi thành công
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    // Tạo 10 bình luận giả định
    const dummyComments = [];
    for (let i = 0; i < 20; i++) { // Sửa lại thành 20 bình luận để có đủ dữ liệu
      dummyComments.push({
        rating: Math.floor(Math.random() * 5) + 1, // Rating từ 1 đến 5
        review: `Đây là bình luận số ${i + 1}`,
        name: `Người dùng ${i + 1}`,
        email: `user${i + 1}@example.com`,
        shareReview: Math.random() < 0.5, // Ngẫu nhiên true hoặc false
        receiveNotifications: Math.random() < 0.5, // Ngẫu nhiên true hoặc false
        note: `Ghi chú cho bình luận số ${i + 1}`,
      });
    }
    setComments(dummyComments);
  }, []); // Chỉ gọi một lần khi component được tạo

  // Tính toán thống kê rating
  const ratingStats = {};
  comments.forEach((comment) => {
    const rating = comment.rating;
    if (!ratingStats[rating]) {
      ratingStats[rating] = 1;
    } else {
      ratingStats[rating]++;
    }
  });

  // Chuyển đổi dữ liệu thống kê rating thành dạng phù hợp cho Table của Ant Design
  const dataSource = Object.keys(ratingStats).map((rating) => ({
    rating: <Rate disabled defaultValue={parseInt(rating)} />, // Chuyển rating thành component Rate
    quantity: ratingStats[rating],
  }));

  const columns = [
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      width: '50%'
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '50%'
    },
  ];

  return (
    <div className="product-review-popup-container">
      {/* Bảng thống kê rating */}

      {/* Bảng thống kê rating */}
      <div style={{ width: "50%" }}>
        <Table className="product-review-table" dataSource={dataSource} columns={columns} size="small" pagination={false} />

      </div>


      <Button type="primary" onClick={toggleModal}>
        Mở Form
      </Button>

      <Modal
        title="Đánh giá Sản phẩm"
        open={isModalVisible}
        onCancel={toggleModal}
        footer={null}
      >
        <Form
          form={form}
          name="product_review"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item name="rating" label="Đánh giá" rules={[{ required: true }]}>
            <Rate />
          </Form.Item>

          <Form.Item name="review" label="Nhận xét của bạn" rules={[{ required: true }]}>
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              Gửi Nhận xét
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Hiển thị danh sách bình luận */}
      <List
        dataSource={comments}
        header={<div>Danh sách Bình luận</div>}
        renderItem={(item) => (
          <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '8px' }}>
            <div style={{ display: 'block', marginTop: '8px', fontWeight: 'bold' }}>{item.name ? item.name : item.email}</div>
            <List.Item>

              <List.Item.Meta

                title={<Rate disabled defaultValue={item.rating} />} // Hiển thị rating dưới dạng sao
                description={item.review}
              />

            </List.Item>
          </div>

        )}
      />
    </div>
  );
};

export default ProductReviewForm;
