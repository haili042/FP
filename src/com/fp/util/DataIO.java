package com.fp.util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class DataIO {

	private String algorithm; // 文件名
	private String fileName; // 文件名
	private String minSup; // 文件名
	private String realPath; // 项目路径
	private String srcPath = "dataset"; // 输出
	private String destPath = "result"; // 输出
	private String readPath;
	private String writePath;
	
	private File file; // 文件
	private Map<String, String> datasets = new HashMap<>();
	
	{
		datasets.put("accidents", "accidents.dat");
		datasets.put("mushroom", "mushroom.dat");
		datasets.put("T10I4D100K", "T10I4D100K.dat");
	}
	

	// 构造函数
	public DataIO(HttpServletRequest req, HttpServletResponse res) {
		String fileName = req.getParameter("fileName"); // 文件名参数
		
		this.algorithm = req.getParameter("algorithm");
		this.fileName = fileName;
		this.minSup = req.getParameter("minSup");
		this.realPath = req.getServletContext().getRealPath("/"); // 项目路径
		this.readPath = realPath + srcPath + "\\";
		this.writePath = realPath + destPath + "\\" + algorithm;
		this.file = new File(this.readPath + "\\" + datasets.get(fileName)); 
		
	}
	
	// 读静态数据
	public BufferedReader read() {
		
		BufferedReader br = null;
		try {
			FileReader fr = new FileReader(file);
			br = new BufferedReader(fr);

		} catch (IOException e) {
			System.out.println("读取事务文件失败...");	
			e.printStackTrace();
		}
		return br;
	}

	// 写入结果文件流
	public BufferedWriter wirte() {
		
		BufferedWriter bw = null;
		try {
			// 没有该目录就创建目录
			File dir = new File(this.writePath);
			if (!dir.exists()) {
				dir.mkdir();
			}
			
			// 创建空文件
			File tempFile = new File(this.writePath + "\\" + fileName + "_" + minSup + ".dat");
			
			// 存在就删除原来的
			if (tempFile.exists()) {
				tempFile.delete();
			}
			
			bw = new BufferedWriter(new FileWriter(tempFile));
		} catch (IOException e) {
			System.out.println("写入结果文件失败...");
			e.printStackTrace();
		}
		return bw;
	}
	
	// 读取文件名
	public String getMinSup() {
		return this.minSup;
	}
	
	// 读取文件名
	public String getFileName() {
		return this.fileName;
	}
	
	// 读取路径
	public String getReadPath() {
		return this.readPath;
	}
	
	// 读取路径
	public String getWritePath() {
		return this.writePath;
	}

}
