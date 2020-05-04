import express from 'express';
import path from 'path';

export default async (app) => {
	app.use(express.static(path.join(__dirname, '../../../front/dist')));
}
