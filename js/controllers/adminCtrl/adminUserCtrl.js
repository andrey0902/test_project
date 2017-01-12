
 // new controler

         App.controller('AdminUserCtrl',function ($resource,$location, $http,$interval,$rootScope,$cookies) {
            // $scope.adminUser= this;
             this.dbUrl='http://127.0.0.1:2403/user/';

             this.objSendUser=$resource(this.dbUrl+':id',{id:'@id'});

             this.refresh=function(){
                 this.users=this.objSendUser.query()
             };
             this.refresh();

    this.del=function (item) {
     // item.$delete().then(function (resul) {
            for(var i=0; i<this.users.length;i++){
                if(this.users[i].id==item.id){
                   this.users.splice(i,1)
                }

            }
    // })
    }



this.test= 'lala1111';








             })

