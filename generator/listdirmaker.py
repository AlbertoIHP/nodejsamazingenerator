import sys, os, struct
from stat import *

class listDirMaker(object):
	
	def __init__(self, path):
		self.dirList = []
		self.walktree( path , self.visitfile)
		
 
	def walktree(self, top, callback):
	   '''recursively descend the directory tree rooted at top,
		  calling the callback function for each regular file'''
	 
	   for f in os.listdir(top):
		   pathname = os.path.join(top, f)
		   mode = os.stat(pathname).st_mode
		   if S_ISDIR(mode):
			   # It's a directory, recurse into it
			   self.walktree(pathname, callback)
		   elif S_ISREG(mode):
			   # It's a file, call the callback function
			   callback(pathname,f,top)
		   else:
			   # Unknown file type, print a message
			   print 'Skipping %s' % pathname
 
	def visitfile(self, fullname,file,path):
		format = fullname.split(".")
		self.dirList.append(fullname)
        #if(format[format.__len__()-1] == "TIF"):
		#	self.dirList.append(fullname)
			
	def getdirList(self):
		return self.dirList
		
	def getIndexOf(self):
		return self.dirList.__len__()
		