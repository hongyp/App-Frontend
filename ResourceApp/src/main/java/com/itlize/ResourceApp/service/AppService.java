package com.itlize.ResourceApp.service;

import java.util.List;

import com.itlize.ResourceApp.domain.Data;

public interface AppService {
	
//	Create
	Data saveDataToProject(Data data);
//	Read
	List<Data> generateRows(int projectId);

}
