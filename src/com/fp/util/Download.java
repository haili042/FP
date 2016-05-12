package com.fp.util;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 导入导出文件
 */

public class Download extends HttpServlet {
	private static final long serialVersionUID = 1859766838217803284L;

	private static String path = "/result";
	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		try {
			String algorithm = request.getParameter("algorithm");
			String fileName = request.getParameter("fileName");
			String minSup = request.getParameter("minSup");
			
			String filepath = request.getParameter("path");
			response.setContentType("text/plain");
			response.setHeader("Location", fileName);
			response.setHeader("Content-Disposition", "attachment; filename="
					+ fileName);
			OutputStream outputStream = response.getOutputStream();
			InputStream inputStream = new FileInputStream(filepath
					+ fileName);
			byte[] buffer = new byte[1024];
			int i = -1;
			while ((i = inputStream.read(buffer)) != -1) {
				outputStream.write(buffer, 0, i);
			}
			outputStream.flush();
			outputStream.close();
		} catch (FileNotFoundException e1) {
			System.out.println("没有找到您要的文件");
		} catch (Exception e) {
			System.out.println("系统错误，请及时与管理员联系");
		}
	}

}