import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("อีเมลไม่ถูกต้อง").required("อิเมลจำเป็น"),
});

export default schema;
