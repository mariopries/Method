Menu.Cycle();
Method.BlurValidation();
KeyBind.Bind("F9");
KeyBind.SelectedBind();
Mask.All();
$("body").on("focus", ":input", () => {
    Method.FixPrompts();
});
