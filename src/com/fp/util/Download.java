package com.fp.util;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;

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
	
	public void doGet(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		
		try {
			String realPath = req.getServletContext().getRealPath("/");
			String algorithm = req.getParameter("algorithm");
			String minSup = req.getParameter("minSup");
			String fileName = req.getParameter("fileName") + "_" + minSup + ".dat";
			String filePath = realPath + path + "\\" + algorithm + "\\" + fileName;
			
			res.setContentType("text/plain");
			res.setHeader("Location", fileName);
			res.setHeader("Content-Disposition", "attachment; filename="
					+ fileName);
			OutputStream outputStream = res.getOutputStream();
			InputStream inputStream = new FileInputStream(filePath);
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