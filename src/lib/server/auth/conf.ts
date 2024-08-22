import type { Dayjs } from "dayjs";

export type User = {
	username: string,
	password: string,
	session_id: null | string,
	extracurricular_wed: boolean,
	extracurricular_thu: boolean,
	extracurricular_fri: boolean,
	subjects_filter: null | string,
	expiry: null | string
}

export enum UsersDbField {
	USERNAME = "username",
	PASSWORD = "password",
	SESSION_ID = "session_id",
	EXTRACURRICULAR_WED = "extracurricular_wed",
	EXTRACURRICULAR_THU = "extracurricular_thu",
	EXTRACURRICULAR_FRI = "extracurricular_fri",
	SUBJECTS_FILTER = "subjects_filter",
	EXPIRY = "expiry"
}

export const PB_DB_URL = "https://taskmate.pockethost.io";
export const PB_USERS_DB = "users";
export const PB_FINISHED_TASKS_DB="finished_tasks";

export const PB_ADMIN_USER=process.env.DB_ADMIN_USER
export const PB_ADMIN_PASSWORD=process.env.DB_ADMIN_PASSWORD
