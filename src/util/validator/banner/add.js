import * as yup from "yup";

const schema = yup.object().shape({
  banner: yup.array().min(1, "ภาพหลักจำเป็น").required("ภาพหลักจำเป็น"),
});

export default schema;
