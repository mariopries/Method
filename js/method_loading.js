import { lastFocused, Method, Menu, KeyBind, Mask } from "./method_classes.js";
import { makeAsync } from "./method_util.js";

function afterLoad() {

    Menu.Cycle();
    Method.BlurValidation();
    KeyBind.Bind("F9");
    KeyBind.SelectedBind();
    Mask.All();
    $("body").on("focus", ":input", () => {
        Method.FixPrompts();
    });

}

try {
    makeAsync(afterLoad, [])
        .catch(err => alert(err.message));
} catch (error) {
    alert(error.message);
}