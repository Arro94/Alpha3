var Options = function () {
  this.assetsDir = __dirname + '/../assets';
  this.emailList = this.assetsDir + '/email_list.txt';
  this.clearListKey = 'test';
};

module.exports= new Options();
