export function generateJsonSchema(form) {
  const { name, description, fields } = form;

  const schema = {
    title: name || "Untitled Form",
    description: description || "",
    type: "object",
    properties: {},
    required: [],
  };

  fields.forEach((field) => {
    const id = field.label || field.id;
    const fieldSchema = {};

    switch (field.type) {
      case "text":
      case "textarea":
      case "phone":
        fieldSchema.type = "string";
        break;
      case "email":
        fieldSchema.type = "string";
        fieldSchema.format = "email";
        break;
      case "number":
        fieldSchema.type = "number";
        break;
      case "checkbox":
        fieldSchema.type = "boolean";
        break;
      case "dropdown":
      case "radio":
        fieldSchema.type = "string";
        if (field.options) fieldSchema.enum = field.options;
        break;
      case "date":
        fieldSchema.type = "string";
        fieldSchema.format = "date";
        break;
      default:
        fieldSchema.type = "string";
    }

    schema.properties[id] = fieldSchema;

    if (field.required) {
      schema.required.push(id);
    }
  });

  return schema;
}
