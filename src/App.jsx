import "./App.css";
import {
  Card,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Upload,
  Skeleton,
  Switch,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
const { Meta } = Card;

function App() {
  const [flowers, setFlowers] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true); // State to handle initial loading state

  const onFinish = async (values) => {
    console.log(values);

    const shouldUpload = {
      title: values.title,
      price: values.price,
      main_image: values.main_image.file.response.image_url.url,
      discount: values.discount,
      discount_price: values.discount_price,
      detailed_images: [
        "https://www.coartsinnovation.com/wp-content/uploads/2021/05/Artificial-Topiary-CAJM-7136.png",
        "https://www.coartsinnovation.com/wp-content/uploads/2021/05/Artificial-Topiary-CAJM-7136.png",
        "https://cdn11.bigcommerce.com/s-2mpfm/images/stencil/640w/products/169512/743847/5965__41958.1630728740.jpg?c=2",
        "https://cdn11.bigcommerce.com/s-2mpfm/images/stencil/640w/products/169089/743279/5493__27309.1630683935.jpg?c=2",
      ],
      rate: 0,
      views: 0,
      tags: [],
      comments: [values.comments],
      short_description: values.shortDescription,
      description: values.description,
    };

    await fetch(
      "http://localhost:8080/api/flower/category/house-plants?access_token=64bebc1e2c6d3f056a8c85b7",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer YOUR_ACCESS_TOKEN",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shouldUpload),
      }
    );

    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8080/api/flower/category/house-plants?access_token=64bebc1e2c6d3f056a8c85b7"
      );

      const data = await response.json();

      setTimeout(() => {
        // Simulate delay for skeleton loaders
        setFlowers(data.data);
        setLoading(false); // Set loading state to false once data is fetched
      }, 1000); // Adjust the delay as needed
    };

    fetchData();
  }, []);

  const onSwitch = (checked) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <div className="bg-white">
      <Modal
        okText="Create"
        onOk={() => setOpen(false)}
        visible={open}
        onCancel={() => setOpen(false)}
        title="Add Flower"
        footer={false}
      >
        <Form onFinish={onFinish}>
          {/* Title */}
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input your title!",
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>
          {/* Img upload */}
          <Form.Item
            label="Upload"
            name="main_image"
            rules={[
              {
                required: true,
                message: "Please upload your image!",
              },
            ]}
          >
            <Upload
              name="image"
              action="http://localhost:8080/api/upload?access_token=64bebc1e2c6d3f056a8c85b7"
            >
              <Button>Upload</Button>
            </Upload>
          </Form.Item>
          {/* Price */}
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your price!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          {/* discount */}
          <Form.Item
            label="Discount"
            name="discount"
            rules={[
              {
                required: true,
                message: "Please input your price!",
              },
            ]}
          >
            <Switch defaultChecked onChange={onSwitch} />
          </Form.Item>
          {/* discount price */}
          <Form.Item
            label="Discount_price"
            name="discount_price"
            rules={[
              {
                required: true,
                message: "Please input your discount price!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          {/* short description */}
          <Form.Item
            label="Short description"
            name="shortDescription"
            rules={[
              {
                required: true,
                message: "Please input your title!",
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>
          {/* Description */}
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your title!",
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>
          {/* Comments */}
          <Form.Item
            label="Comments"
            name="comments"
            rules={[
              {
                required: true,
                message: "Please input your comments!",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          {/* buttons to create */}
          <Form.Item>
            <Button danger onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button htmlType="submit">Create</Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="absolute top-2 right-10">
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Add
        </Button>
      </div>
      <div className="box">
        {loading ? (
          // Render skeleton cards while loading
          <>
            <Skeleton active paragraph={{ rows: 1 }} />
            <Skeleton active paragraph={{ rows: 1 }} />
            <Skeleton active paragraph={{ rows: 1 }} />
          </>
        ) : (
          // Render actual flower cards once data is loaded
          flowers.map(({ _id, main_image, title, short_description }) => (
            <Card
              key={_id}
              hoverable
              style={{
                width: 440,
              }}
              cover={<img alt="example" src={main_image} />}
            >
              <Meta
                title={title}
                description={short_description}
                // description={description}
                // discount_price={discount_price}
              />
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default App;

// import { Button, Form, Input, Upload } from "antd";
// import { PlusOutlined } from "@ant-design/icons";

// function App() {
//   const onSubmit = (values) => {
//     console.log(values);
//   };
//   return (
//     <div className="flex justify-center items-center">
//       <Form onFinish={onSubmit} layout="horizontal" style={{ maxWidth: 600 }}>
//         <Form.Item
//           label="Title"
//           name={"title"}
//           rules={[
//             {
//               required: true,
//               message: "Please enter title",
//             },
//           ]}
//         >
//           <Input placeholder="enter title" />
//         </Form.Item>

//         <Form.Item
//           label="Upload"
//           name={"main_image"}
//           rules={[
//             {
//               required: true,
//               message: "Please upload image",
//             },
//           ]}
//         >
//           <Upload
//             name="image"
//             action="http://localhost:8080/api/upload?access_token=64bebc1e2c6d3f056a8c85b7"
//           >
//             <Button>Upload</Button>
//           </Upload>
//         </Form.Item>

//         <Form.Item>
//           <Button htmlType="submit">Submit</Button>{" "}
//         </Form.Item>
//       </Form>
//     </div>
//   );
// }

// export default App;
