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

	private String fileName; // 文件名
	private String destPath = "result/apriori";
	private String realPath;
	private File file; // 文件
	private static Map<String, String> dataSets = new HashMap<>(); // 数据集
	
	{
		dataSets.put("accidents", "dataset\\statical\\accidents.dat"); // 2125
		dataSets.put("mushroom", "dataset\\statical\\mushroom.dat"); // 8142
		dataSets.put("T10I4D100K", "dataset\\statical\\T10I4D100K.dat"); // 100000
	}

	// 构造函数
	public DataIO(HttpServletRequest req, HttpServletResponse res) {
		this.realPath = req.getServletContext().getRealPath("/"); // 项目路径
		this.fileName = req.getParameter("fileName"); // 文件名参数
		this.file = new File(realPath + dataSets.get(fileName)); // 事务数据文件名
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
		
		// 给文件加个时间戳
		SimpleDateFormat sdf = new SimpleDateFormat("yyMMdd hhmmss");
		String time = "(" + sdf.format(new Date()) + ")";

		BufferedWriter bw = null;
		try {
			// 没有该目录就创建目录
			File dir = new File(destPath);
			if (!dir.exists()) {
				dir.mkdir();
			}
			
			// 创建空文件
			File tempFile = new File(realPath + "/" + destPath + "/" + fileName + time + ".dat");
			if (tempFile.exists()) {
				tempFile.delete();
			}
			
			bw = new BufferedWriter(new FileWriter(tempFile));
		} catch (IOException e) {
			System.out.println("读取事务文件失败...");
			e.printStackTrace();
		}
		return bw;
	}

}
