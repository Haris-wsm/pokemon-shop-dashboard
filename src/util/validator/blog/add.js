import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("ชื่อจำเป็น"),
  publish: yup.boolean().notRequired(),
  titleImage: yup.array().min(1, "ภาพหลักจำเป็น").required("ภาพหลักจำเป็น"),
});

export default schema;
