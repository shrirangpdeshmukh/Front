export const Login = {
  email: {
    elementType: "input",
    elementConfig: {
      type: "email",
      id: "Login",
      placeholder: "Your Email",
    },
    value: null,
    icon: "email",
    validation: {
      required: true,
      isEmail: true,
    },
    valid: false,
    touched: false,
  },

  password: {
    elementType: "input",
    elementConfig: {
      type: "password",
      placeholder: "Your Password",
      id: "LoginPass",
    },
    value: null,
    icon: "lock",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
};

export const ResetPassword = {
  token: {
    elementType: "input",
    elementConfig: {
      type: "text",
      id: "PassCheck",
      placeholder: "Paste the Token Here",
    },
    value: null,
    icon: "key",
    validation: {
      required: true,
      isNumeric: true,
      minLength: 4,
      maxLength: 4,
    },
    valid: false,
    touched: false,
  },

  password: {
    elementType: "input",
    elementConfig: {
      type: "password",
      placeholder: "Your Password",
      id: "SignUpPass",
    },
    value: null,
    icon: "lock",
    validation: {
      required: true,
      minLength: 8,
    },
    valid: false,
    touched: false,
  },

  passwordConfirm: {
    elementType: "input",
    elementConfig: {
      type: "password",
      placeholder: "Confirm Your Password",
      id: "SignUpPassConfirm",
    },
    value: null,
    icon: "lockFill",
    validation: {
      required: true,
      minLength: 8,
      same: true,
    },
    valid: false,
    touched: false,
  },
};

export const ForgotPassword = {
  email: {
    elementType: "input",
    elementConfig: {
      type: "email",
      id: "ForgotEmail",
      placeholder: "Your Email",
    },
    value: null,
    icon: "email",
    validation: {
      required: true,
      isEmail: true,
    },
    valid: false,
    touched: false,
  },
};

export const UpdatePassword = {
  password: {
    elementType: "input",
    elementConfig: {
      type: "password",
      placeholder: "Your Current Password",
      id: "SignUpPass",
    },
    value: null,
    icon: "lock",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },

  newPassword: {
    elementType: "input",
    elementConfig: {
      type: "password",
      placeholder: "Your New Password",
      id: "SignUpPass",
    },
    value: null,
    icon: "lock",
    validation: {
      required: true,
      minLength: 8,
    },
    valid: false,
    touched: false,
  },

  newPasswordConfirm: {
    elementType: "input",
    elementConfig: {
      type: "password",
      placeholder: "Confirm Your New Password",
      id: "SignUpPassConfirm",
    },
    value: null,
    icon: "lockFill",
    validation: {
      required: true,
      minLength: 8,
      same: true,
    },
    valid: false,
    touched: false,
  },
};

export const AddBio = {
  bio: {
    elementType: "input",
    elementConfig: {
      type: "text",
      id: "designation",
      placeholder: "Bio goes here....",
    },
    value: null,
    icon: "designation",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
};

export const ChangeDesignation = {
  designation: {
    elementType: "input",
    elementConfig: {
      type: "text",
      id: "designation",
      placeholder: "New Designation",
    },
    value: null,
    icon: "designation",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
};

export const AwardPoints = {
  points: {
    elementType: "input",
    elementConfig: {
      type: "text",
      id: "points",
      placeholder: "Points Awarded",
    },
    value: null,
    icon: "points",
    validation: {
      required: true,
      isNumeric: true,
    },
    valid: false,
    touched: false,
  },

  reason: {
    elementType: "input",
    elementConfig: {
      type: "text",
      id: "reason",
      placeholder: "Reason for Awarding Points",
    },
    value: null,
    icon: "reason",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
};

export const CreateTask = {
  heading: {
    elementType: "input",
    elementConfig: {
      type: "text",
      id: "heading",
      placeholder: "Task Heading",
    },
    value: null,
    icon: "",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
  description: {
    elementType: "input",
    elementConfig: {
      type: "text",
      id: "description",
      placeholder: "Task Description",
    },
    value: null,
    icon: "",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
  deadline: {
    elementType: "input",
    elementConfig: {
      type: "text",
      id: "deadline",
      placeholder: "Deadline DD/MM/YYYY",
    },
    value: null,
    icon: "",
    validation: {
      required: true,
      isDate: true,
    },
    valid: false,
    touched: false,
  },
};

export const CreateTopic = {
  heading: {
    elementType: "input",
    elementConfig: {
      type: "text",
      id: "heading",
      placeholder: "Heading",
    },
    value: null,
    icon: "points",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },

  description: {
    elementType: "input",
    elementConfig: {
      type: "text",
      id: "description",
      placeholder: "Description",
    },
    value: null,
    icon: "reason",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
};

export const AddAssignment = {
  emails: {
    elementType: "textarea",
    elementConfig: {
      type: "text",
      id: "email",
      placeholder: "Enter comma seperated emails",
    },
    value: null,
    icon: "",
    validation: {
      required: true,
      isCommaSeperatedEmailList: true,
    },
    valid: false,
    touched: false,
  },
};

export const RemoveAssignment = {
  email: {
    elementType: "textarea",
    elementConfig: {
      type: "text",
      id: "email",
      placeholder: "Enter email of the user to unassign",
    },
    value: null,
    icon: "",
    validation: {
      required: true,
      isEmail: true,
    },
    valid: false,
    touched: false,
  },
};
