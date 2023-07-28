export type userProjectByUserType = {
  name: string;
  checked: boolean;
  key: number;
};

export type addUserProjectType = {
  userId: number | undefined;
  projectId: number;
};

export type getAllProjectItem = {
  key: number;
  projectName: string;
  address: string;
};
