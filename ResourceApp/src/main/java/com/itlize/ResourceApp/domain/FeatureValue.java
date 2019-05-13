package com.itlize.ResourceApp.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Value")
public class FeatureValue {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column
	private String value;

	@Column(name = "project_id")
	private int projectId;

	@Column(name = "resource_id")
	private int resourceId;

	@Column(name = "feature_id")
	private int featureId;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public int getProjectId() {
		return projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public int getResourceId() {
		return resourceId;
	}

	public void setResourceId(int resourceId) {
		this.resourceId = resourceId;
	}

	public int getFeatureId() {
		return featureId;
	}

	public void setFeatureId(int featureId) {
		this.featureId = featureId;
	}

	@Override
	public String toString() {
		return "FeatureValue [id=" + id + ", value=" + value + ", projectId=" + projectId + ", resourceId=" + resourceId
				+ ", featureId=" + featureId + "]";
	}

}
