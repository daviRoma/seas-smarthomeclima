/**
 * Dialog configuration
 */

const dialogConfig = {
  title: '',
  content: '',
  operation: ''
};

export const SmartRoomDialogConf = {
  minWidth: '70%',
  maxWidth: '80%',
  position: { top: '5%', left: '26%' },
  data: {
    smartRoom: null,
    dialogConfig
  },
};

export const EditDialogConf = {
  minWidth: '60%',
  maxWidth: '100%',
  maxHeight: '80%',
  position: { top: '6%' },
  data: {
    smartRoom: null,
    item: null,
    dialogConfig
  },
};

export const DeleteDialogConf = {
  minWidth: '40%',
  maxWidth: '85%',
  position: { top: '14%', left: '35%' },
  data: {
    item: null,
    dialogConfig
  },
};
