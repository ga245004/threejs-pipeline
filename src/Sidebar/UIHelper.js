import { UIBoolean, UIRow, UISelect, UIText } from "../libs/ui";

const AddHeader = (container, text) => {
  const headerRow = new UIRow();
  headerRow.add(new UIText(text.toUpperCase()));
  container.add(headerRow);
};

const AddBoolean = (container, lable, value) => {
  const booleanRow = new UIRow();
  booleanRow.add(new UIText(lable).setWidth("90px"));
  container.add(booleanRow);

  const boolean = new UIBoolean(value);
  booleanRow.add(boolean);
  return boolean;
};

const AddSelect = (container, lable, options) => {
  const selectRow = new UIRow();
  selectRow.add(new UIText(lable).setWidth("90px"));
  container.add(selectRow);

  const select = new UISelect().setOptions(options);
  selectRow.add(select);
  return select;
};

export { AddHeader, AddBoolean, AddSelect };
