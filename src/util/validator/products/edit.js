import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("ชื่อจำเป็น"),
  price: yup
    .number()
    .typeError("ราคาต้องเป็นตัวเลขเท่านั้น")
    .required("ราคาจำเป็น")

    .min(1, "ราคาควรอย่างน้อยมากกว่า 1"),
  status: yup.string().required("สถานะสินค้าจำเป็น"),
  category: yup.string().required("ประเภทสินค้าจำเป็น"),
  // type: yup.string().required("ประเภทการขายจำเป็น"),
  promotionSale: yup.boolean().notRequired(),
  promotionPrice: yup
    .number()
    .notRequired()
    .when(["promotionSale", "price"], {
      is: (promotionSale) => (promotionSale ? true : false),
      then: (schema) => {
        return schema
          .min(1, "จำนวนราคาส่วนลดขั้นต่ำ มากกว่า 1")
          .required("จำนวนราคาส่วนลดจำเป็น")
          .typeError("จำนวนราคาส่วนลดต้องเป็นตัวเลขเท่านั้น")
          .test(
            "is-valid-discount",
            "ราคาส่วนลดต้องไม่เกินราคาสินค้า",
            function (value) {
              return (
                value <= this.parent.price && this.parent.price - value > 0
              );
            }
          );
      },
      otherwise: (schema) => {
        return schema.nullable(true).default(null).notRequired();
      },
    }),
  titleImage: yup.array().min(1, "ภาพหลักจำเป็น").notRequired(""),
  gallery: yup.array().min(1, "ภาพแกลเลอรี่จำเป็น").notRequired(""),
});

export default schema;
