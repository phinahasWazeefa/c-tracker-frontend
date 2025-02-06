"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, Typography } from "@mui/material";

// components
import Autocomplete from "../Textfields/Autocomplete";
import SimpleButton from "../Buttons/SimpleButton";
import SimpleTextField from "../Textfields/TextField";
import FormDialog from "./formDialog";

export default function MaxWidthDialog({
  openState = false,
  changeOpenState,
  categories,
  addEntryActn,
  addNewCategory,
}) {
  const [createdCategoryName, setCreatedCategoryName] = React.useState(null);
  const [itemUnitPrice,setItemUnitPrice] = React.useState(null)
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [unitPrice,setUnitPrice] = React.useState(null);
  const [itemName,setItemName] = React.useState(null);
  const [quantity,setQuantity] = React.useState(null)


  const [formDialogState, setFormState] = React.useState(false);

  

  const openFormDialog = () => {
    setFormState(true);
  };

  const closeFormDialog = () => {
    setFormState(false);
  };

  const addExepnseBtn = () => {
    const expenseData = {
      itemId: selectedCategory,
      quantity:quantity,
      unitPrice:unitPrice,
      itemName:itemName
    };
    addEntryActn(expenseData);
  };

  const createANewCategoryFn = () => {
    addNewCategory({ itemName: createdCategoryName, itemPrice:itemUnitPrice });
    setFormState(false);
  };

  const addItemDetailsFn = (itemId,itemName,unitPrice)=>{
setSelectedCategory(itemId);
setItemName(itemName);
setUnitPrice(unitPrice)
  }

  return (
    <React.Fragment>
      {/* Add new item dialog   */}
      <FormDialog
        openState={formDialogState}
        closeFn={closeFormDialog}
        textFieldLabel={"Item"}
        title="Add New Item"
        textFieldType={"text"}
        formSubmtFn={createANewCategoryFn}
        onChangeTextfield={setCreatedCategoryName}
        onChangeUnitPrice={setItemUnitPrice}
      />

      <Dialog
        fullScreen
        fullWidth={true}
        maxWidth={"lg"}
        open={openState}
        onClose={changeOpenState}
        sx={{ fontFamily: "Poppins !important" }}
      >

        <DialogTitle
          marginBottom={1}
          sx={{
            fontFamily: "Poppins !important",
            fontSize: "16px",
            background: "#303737",
            color: "white",
          }}
        >
          <Typography>Add Expense</Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={6} sm={6}>
              <Autocomplete
                optionValues={categories}
                displayKey="name"
                label="Items"
                onChangeFn={addItemDetailsFn}
              />
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: "15px",
              }}
            >
              <SimpleButton buttonName="Add new" onClickActn={openFormDialog} />
            </Grid>

            <Grid item xs={6} sm={6}>
              <SimpleTextField label="Quantity" onChangeFn={setQuantity} />
            </Grid>


            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: "15px",
              }}
            >
              <SimpleButton buttonName="Save" onClickActn={addExepnseBtn} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={changeOpenState}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
