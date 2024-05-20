
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
  Rate,
  Radio,
  Carousel,
} from "antd";
import {
  SettingOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState, useRef } from "react";
const { Meta } = Card;

function App() {
  const [flowers, setFlowers] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState(["House Plants"]);
  const carouselRefs = useRef({});
  const intervalRefs = useRef({});

  const onFinish = async (values) => {
    console.log(values);

    const shouldUpload = {
      title: values.title,
      price: values.price,
      discount: values.discount,
      discount_price: values.discount_price,
      main_image: values.main_image.file.response.image_url.url,
      detailed_images: [
        values.detailed_img_1.file.response.image_url.url,
        values.detailed_img_2.file.response.image_url.url,
        values.detailed_img_3.file.response.image_url.url,
        values.detailed_img_4.file.response.image_url.url,
      ],
      description: values.description,
      short_description: values.shortDescription,
      comments: [values.comments],
      rate: values.rate,
      tags: [values.tags],
      sold: values.sold,
    };

    await fetch(
      "http://localhost:8080/api/flower/category/house-plants?access_token=64bebc1e2c6d3f056a8c85b7",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0YzAyZDEwMzIwNjk5ODJkYmJhOTRlZiIsIm5hbWUiOiJUZXN0Iiwic3VybmFtZSI6IlRlc3RvdiIsInBhc3N3b3JkIjoidGVzdF90ZXN0IiwicGVybWlzc2lvbiI6eyJjcmVhdGUiOmZhbHNlLCJ1cGRhdGUiOmZhbHNlLCJkZWxldGUiOmZhbHNlLCJyZWFkIjp0cnVlfSwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInVzZXJfdHlwZSI6Im9ic2VydmVyIiwiY3JlYXRlX3Bvc3RfbGltaXQiOjAsImNyZWF0ZV9hY2NvdW50X2xpbWl0IjowLCJjcmVhdGVfcGxhbnRfbGltaXQiOjAsImhhc2h0YWdzIjpbXSwid2lzaGxpc3QiOltdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNy0yNVQyMDoxNDowOC4wNDhaIiwiX192IjowfSwiaWF0IjoxNjkwMzE2MjY3fQ.Lwf1q47UoD5eUzFp4IXjgCD05xvnDrojZ5lST9mrMfc",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shouldUpload),
      }
    );

    setFlowers([...flowers, shouldUpload]);

    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8080/api/flower/category/house-plants?access_token=64bebc1e2c6d3f056a8c85b7"
      );

      const data = await response.json();

      setTimeout(() => {
        setFlowers(data.data);
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  const onSwitch = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const onDelete = async (_id) => {
    console.log(_id);

    await fetch(
      `http://localhost:8080/api/user/blog?access_token=64bebc1e2c6d3f056a8c85b7`,
      {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0YmRmM2ZiZWNlMDlmZTc4MDU1MGE5MCIsIm5hbWUiOiJBc2FkYmVrIGRldi10ZXN0Iiwic3VybmFtZSI6IkFiZHV2b2l0b3YiLCJwYXNzd29yZCI6Ijk5NTMyMTAyNUFhIiwicGVybWlzc2lvbiI6eyJjcmVhdGUiOmZhbHNlLCJ1cGRhdGUiOmZhbHNlLCJkZWxldGUiOmZhbHNlLCJyZWFkIjp0cnVlfSwiZW1haWwiOiJhc2FkYmVrYWJkdXZvaXRvdjNAZ21haWwuY29tIiwidXNlcl90eXBlIjoib2JzZXJ2ZXIiLCJjcmVhdGVfcG9zdF9saW1pdCI6MCwiY3JlYXRlX2FjY291bnRfbGltaXQiOjAsImNyZWF0ZV9wbGFudF9saW1pdCI6MCwiaGFzaHRhZ3MiOltdLCJ3aXNobGlzdCI6W10sImNyZWF0ZWRfYXQiOiIyMDIzLTA3LTI0VDAzOjQ2OjAzLjg2M1oiLCJfX3YiOjB9LCJpYXQiOjE2OTAxNzA1Mzl9.wq6N_PqwMDQNeHaS0tXJgt7Oo90Up1CsoXW8nHPGCLs",
          "Content-Type": "application/json",
        },
      }
    );

    setFlowers((prevFlowers) =>
      prevFlowers.filter((flower) => flower._id !== _id)
    );
  };

  const tagChange = (e) => {
    setTags(e.target.value);
  };

  const handleMouseEnter = (id) => {
    if (carouselRefs.current[id]) {
      intervalRefs.current[id] = setInterval(() => {
        carouselRefs.current[id].next();
      }, 2000);
    }
  };

  const handleMouseLeave = (id) => {
    if (intervalRefs.current[id]) {
      clearInterval(intervalRefs.current[id]);
    }
    if (carouselRefs.current[id]) {
      carouselRefs.current[id].goTo(0);
    }
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
          {/* Detailed images upload */}
          <Form.Item
            label="Detailed_img_1"
            name="detailed_img_1"
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
          <Form.Item
            label="Detailed_img_2"
            name="detailed_img_2"
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
          <Form.Item
            label="Detailed_img_3"
            name="detailed_img_3"
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
          <Form.Item
            label="Detailed_img_4"
            name="detailed_img_4"
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
          <Form.Item label="Discount" name="discount" valuePropName="checked">
            <Switch onChange={onSwitch} />
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
          {/* Rate */}
          <Form.Item
            label="Rate"
            name="rate"
            rules={[
              {
                required: true,
                message: "Please rate the flower!",
              },
            ]}
          >
            <Rate />
          </Form.Item>
          {/* Tags */}
          <Form.Item
            label="Tags"
            name="tags"
            rules={[
              {
                required: true,
                message: "Please choose the tag!",
              },
            ]}
          >
            <Radio.Group value={tags} onChange={tagChange}>
              <Radio.Button value="House Plants">House Plants</Radio.Button>
              <Radio.Button value="Potter Plants">Potter Plants</Radio.Button>
              <Radio.Button value="Small Plants">Small Plants</Radio.Button>
            </Radio.Group>
          </Form.Item>
          {/* Sold */}
          <Form.Item
            label="Sold"
            name="sold"
            rules={[
              {
                required: true,
                message: "Please input your sold number!",
              },
            ]}
          >
            <InputNumber />
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
          <>
            <Skeleton active paragraph={{ rows: 1 }} />
            <Skeleton active paragraph={{ rows: 1 }} />
            <Skeleton active paragraph={{ rows: 1 }} />
          </>
        ) : (
          flowers.map(
            ({
              _id,
              main_image,
              title,
              short_description,
              discount,
              discount_price,
              comments,
              description,
              detailed_images,
              rate,
              tags,
              sold,
            }) => (
              <Card
                key={_id}
                hoverable
                style={{
                  width: 440,
                }}
                cover={
                  <div
                    onMouseEnter={() => handleMouseEnter(_id)}
                    onMouseLeave={() => handleMouseLeave(_id)}
                  >
                    <Carousel
                      dots={false}
                      ref={(el) => (carouselRefs.current[_id] = el)}
                    >
                      {detailed_images.map((image, index) => (
                        <div key={index}>
                          <img alt={`detailed-${index}`} src={image} />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                }
                actions={[
                  <SettingOutlined />,
                  <EditOutlined />,
                  <DeleteOutlined onClick={() => onDelete(_id)} />,
                ]}
              >
                <Meta title={title} description={short_description} />
                <div className="card-info">
                  <p>Discount: {discount ? "Yes" : "No"}</p>
                  {discount && <p>Discount Price: ${discount_price}</p>}
                  <p>Comments: {comments}</p>
                  <p>Description: {description}</p>
                  <p>Rate: {rate}</p>
                  <p>Tags: {tags}</p>
                  <p>Sold: {sold}</p>
                </div>
              </Card>
            )
          )
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
