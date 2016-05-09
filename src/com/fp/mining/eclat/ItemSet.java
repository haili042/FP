package com.fp.mining.eclat;

import java.util.BitSet;


public class ItemSet {
	public static  int limitSupport;//根据阈值计算出的最小支持度数
	public static int ItemSize;//Items数目
	public static int TransSize; //事务数目
	
	public boolean flag=true; //true，表示作为真正的ItemSet,false只作为标记节点，只在HashTabel中使用
	
	public int item=0;// 某项集
	
	public int supports=0;//项集的支持度
	
	public BitSet items=null;
	public BitSet trans=null;
	
	//public TreeSet items=new TreeSet();//项集
	//public TreeSet trans=new TreeSet();//事务集合
	public ItemSet next=null;//下一个项集
	
	public ItemSet(boolean flag)
	{
		this.flag=flag;
		if(flag)
		{
			item=0;// 某项集
			
			supports=0;//项集的支持度
			
			items=new BitSet(ItemSize+1);
			trans=new BitSet(TransSize+1);
		}
	}
}
