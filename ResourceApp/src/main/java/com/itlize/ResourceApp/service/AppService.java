package com.itlize.ResourceApp.service;

import java.util.List;

import com.itlize.ResourceApp.domain.Data;

public interface AppService {
	
//	Create
	public Data saveDataToProject(Data data);
//	Read
	public List<Data> generateRows(int projectId);
//	Update
	public Data updateRow(Data data);

}
