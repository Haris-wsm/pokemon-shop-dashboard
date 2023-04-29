import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("ชื่อจำเป็น"),
  publish: yup.boolean().notRequired(),
  titleImage: yup.mixed().notRequired(),
});

export default schema;
