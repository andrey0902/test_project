angular.module('app').factory('tasksPaginator', ['dbgetData', '$sce',(dbgetData, $sce)=>{
    class TasksPaginator{

        constructor(){
            this.currentPage = 0;
            this.itemsInPage = 10;
            /*this.allTasks = [];*/



           /* dbgetData.tasks.$promise.then((response)=>{
                this.allTasks = _.filter(response, {status: '2'});
                console.log('lastElement', this.allTasks)
            })*/

        }

        setData(data){
            this.allTasks = data;
            console.log('lastElement', this.allTasks)
        }

        getTasksOnPage(num = 0){
            let firstElement = this.itemsInPage * num;
            let lastElement = firstElement + this.itemsInPage;
            this.allTasks = _.filter(this.fullTasks, {status: '2'});
            let arrLength = this.allTasks.length;
            lastElement = (lastElement > arrLength)? arrLength : lastElement;

            return this.allTasks.splice(firstElement, lastElement);


          /*  return dbgetData.getTasks().$promise.then((response)=>{

                this.allTasks = _.filter(response, {status: '2'});

            })*/
        }/* END of getTasksOnPage */

        getNextPageTasks(){
            let nextPageNum = this.currentPage + 1;
            let allPageNum = this.getTotalPageNum();
            if(nextPageNum >= pageNum) nextPageNum = pageNum - 1;
            return this.getAllUsersPage(nextPageNum);
            console.log( 'allPageNum', allPageNum)
        }/* END of  getNextPageTasks */


        getNextPageProducts(){
            let nextPageNum = this.currenPage + 1;
            let pageNum = this.getTotalPageNum();
            if(nextPageNum >= pageNum) nextPageNum = pageNum - 1;
            return this.getAllUsersPage(nextPageNum);
        }/* END of getPrevPageProducts */

        getTotalPageNum(){

            return dbgetData.getTasks().$promise.then((response)=>{

                this.allTasks = _.filter(response, {status: '2'});
                let arrLength = this.allTasks.length;

                return Math.ceil(arrLength /this.itemsInPage )
            })
        }


        getArrayBootstrList(){
            let pagesNum;
            let arrPagesLists = [];
                this.getTotalPageNum().then((response)=>{
                    pagesNum = response;

                    arrPagesLists.push({
                        name:  $sce.trustAsHtml('&laquo;'),
                        link: 'prev'
                    });

                    for( let i = 0; i < pagesNum; i++){
                        let name = i + 1;
                        arrPagesLists.push({
                            name: $sce.trustAsHtml(String(name)),
                            link: i
                        })
                    }

                    arrPagesLists.push({
                        name:  $sce.trustAsHtml('&raquo;'),
                        link: 'next'
                    });
                });
            console.log('pagesNum', pagesNum);








            /*if(pagesNum > 1){
                return arrPagesLists;
            }
            return false;*/
            return arrPagesLists;
        }

    }

    return new TasksPaginator();
}]);