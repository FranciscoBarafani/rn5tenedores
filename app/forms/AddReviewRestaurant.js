import t from "tcomb-form-native";
import inputTemplate from "./templates/Input";
import textAreaTemplate from "./templates/TextArea";

export const AddReviewRestaurantStruct = t.struct({
  title: t.String,
  review: t.String
});
export const AddReviewRestaurantOptions = {
  fields: {
    title: {
      template: inputTemplate,
      config: {
        placeholder: "Titulo de la opinion",
        iconType: "material-community",
        iconName: "silverware"
      }
    },
    review: {
      template: textAreaTemplate,
      config: {
        placeholder: "Opinion"
      }
    }
  }
};
