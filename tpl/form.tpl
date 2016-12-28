 <div class="row" ng-controller="AppCtrl">
            <div class="col-md-offset-2 col-md-8 content">
               <div class="row" ng-if="showFormAuthor">
                   <div class="col-md-12 text-center">
                       <h1>Вход</h1>
                       <a href="#!/main">Вход1</a>

                   </div>
               </div>
                <div class="row">
                    <div class="col-md-offset-1 col-md-10">
                        <form ng-if="showFormAuthor" class="form-horizontal" name="autoForm" novalidate ng-submit="inquiry(User, autoForm.$valid)">
                            <div class="form-group">
                                <label for="name" class="control-label col-sm-3" >Введите логин</label>
                                <div class="col-sm-8">
                                    <input type="text" id="name" name="login" class="form-control" ng-model="User.login" ng-required="requiredValue" ng-minlength="minValue" ng-maxlength="maxValue">

                                </div>
                            </div>
                            <div class="form-group" ng-if="showError">
                                <div class="col-md-offset-4  col-md-8 has-error ">
                                    {{getError(autoForm.login.$error)}}
                                </div>

                                </div>
                            <div class="form-group">
                                <label for="pass" class="col-sm-3 control-label">Введите пароль</label>
                                <div class=" col-sm-8">


                                    <input type="text" class="form-control" id="pass" name="userPassword"  ng-model="User.password" ng-required="requiredValue" ng-minlength="minValue" ng-maxlength="maxValue">
                                </div>

                            </div>
                            <div class="form-group" ng-if="showError">
                                <div class="col-md-offset-4  col-md-8 has-error ">

                                    {{getError(autoForm.userPassword.$error)}}
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-offset-3 col-sm-5">
                                    <div class="checkbox">
                                        <label class="control-label">
                                            <input type="checkbox">Запомнить в системе
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class=" col-md-offset-3 col-sm-3 ">
                                    <button type="submit" class="btn bg-primary">ВХОД</button>
                                </div>
                            </div>
                            <div class="form-group reg_dop">
                                <div class="col-md-offset-3 col-sm-4">
                                    <a href="#!/" ng-click="show('recovery')"> Забыли логин или пароль? </a>
                                </div>
                                <div class=" col-sm-4">
                                    <a href="#!/" ng-click="show('registration')">Регистрация</a>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
                <div class="col-md-12" ng-if="showRegisterForm">
                    <h1> Регистрация</h1>

                    <div class="row">
                        <div class="col-md-offset-1 col-md-10">
                            <form  name="regForm" class="form-horizontal" novalidate ng-submit="mismatch(newUser.password,newUser.confirmPass); inquiry(newUser,regForm.$valid); ">
                                <div class="form-group">
                                    <label for="logi" class="control-label col-md-4"> Введите логин</label>
                                    <div class="col-md-8">
                                        <input type="text" name="login" id="logi" ng-model="newUser.login" class="form-control" ng-required="requiredValue" ng-minlength="minValue" ng-maxlength="maxValue">
                                    </div>
                                    <div class="form-group" ng-if="showError">
                                        <div  class="col-md-offset-4  col-md-8 has-error ">
                                            {{getError(regForm.login.$error)}}
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="em" class="control-label col-md-4"> Введите Email</label>
                                    <div class="col-md-8">
                                        <input type="email" name="email" id="em" ng-model="newUser.email" class="form-control" ng-required="requiredValue" ng-minlength="minValue" ng-maxlength="25">
                                    </div>
                                    <div class="form-group"  ng-if="showError">
                                        <div class="col-md-offset-4  col-md-8 has-error ">
                                            {{getError(regForm.email.$error)}}
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="pass" class="control-label col-md-4"> Введите пароль</label>
                                    <div class="col-md-8">
                                        <input type="password" name="password" id="pass" ng-model="newUser.password" class="form-control" ng-required="requiredValue" ng-minlength="minValue" ng-maxlength="25">
                                    </div>
                                    <div class="form-group" ng-if="showError">
                                        <div class="col-md-offset-4  col-md-8 has-error ">
                                            {{getError(regForm.password.$error)}}
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="confirmPass" class="control-label col-md-4"> Подтверждение пароля</label>
                                    <div class="col-md-8">
                                        <input type="password" ng-blur="mismatch(newUser.password,newUser.confirmPass)" name="confirmPass" id="confirmPass" ng-model="newUser.confirmPass" class="form-control" ng-required="requiredValue" ng-minlength="minValue" ng-maxlength="25">
                                    </div>
                                    <div class="form-group" ng-if="showErrorPassword">
                                        <div class="col-md-offset-4  col-md-8 has-error ">
                                              <span>Пароли не совпадают</span>
                                        </div>
                                    </div>
                                    <div class="form-group" ng-if="showError">
                                        <div class="col-md-offset-4  col-md-8 has-error ">
                                            {{getError(regForm.confirmPass.$error)}}

                                        </div>
                                    </div>
                                </div>


                                <div class="form-group">
                                    <label for="secret" class="control-label col-md-4"> Введите секретное слово</label>
                                    <div class="col-md-8">
                                        <input type="text" name="userSecret" id="secret" class="form-control" ng-model="newUser.secret" ng-required="requiredValue" ng-minlength="minValue" ng-maxlength="maxValue">
                                    </div>
                                    <div class="form-group" ng-if="showError">
                                        <div class="col-md-offset-4  col-md-8 has-error ">
                                            {{getError(regForm.userSecret.$error)}}
                                        </div>
                                    </div>
                                </div>


                                <div class="form-group">
                                    <label for="group" class="control-label col-md-4"> Введите имя Вашей группы</label>
                                    <div class="col-md-8">
                                        <input type="text" name="group" id="group" ng-model="newUser.group" class="form-control" ng-required="requiredValue" ng-minlength="minValue" ng-maxlength="25">
                                    </div>
                                    <div class="form-group" ng-if="showError">
                                        <div class="col-md-offset-4  col-md-8 has-error ">
                                            {{getError(regForm.group.$error)}}
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="col-md-offset-4 col-md-3">
                                    <button class="btn btn-primary " type="submit">Регистрация</button>
                                </div>
                                </div>
                                <div class="form-group reg_dop">
                                    <div class="col-md-offset-4 col-sm-2">
                                        <a href="#!/" ng-click="show('auto')"> Вход </a>
                                    </div>
                                    <div class=" col-sm-4">
                                        <a href="#!/" ng-click="show('recovery')">Забыли логин или пароль?</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-12" ng-if="showRecoverForm">
                    <h1>Восстановление пароля</h1>
                    <div class="row">
                        <div class="col-md-offset-2  col-md-10">
                            <form name="recoveryForm" class="form-horizontal" novalidate ng-submit="inquiry(userRecovery,recoveryForm.$valid)">
                                <div class="form-group">
                                    <label for="loginOEmail" class="control-label col-md-4"> Введите логин или email</label>
                                    <div class=" col-md-6">
                                        <input type="text" name="userRecoverData" id="loginOEmail" class="form-control" ng-model="userRecovery.Data" ng-required="requiredValue" ng-minlength="minValue" ng-maxlength="maxValue">
                                    </div>
                                    <div class="form-group" ng-if="showError">
                                        <div class="col-md-offset-4  col-md-8 has-error ">
                                            {{getError(recoveryForm.userRecoverData.$error)}}
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="secret" class="control-label col-md-4"> Введите секретное слово</label>
                                    <div class="col-md-6">
                                        <input type="text" name="userSecret" id="secret" class="form-control" ng-model="userRecovery.secret" ng-required="requiredValue" ng-minlength="minValue" ng-maxlength="maxValue">
                                    </div>
                                    <div class="form-group" ng-if="showError">
                                        <div class="col-md-offset-4  col-md-8 has-error ">
                                            {{getError(recoveryForm.userSecret.$error)}}
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group ">
                                    <div class="col-md-offset-4 col-md-3">
                                        <button class="btn btn-primary" type="submit">Отправить</button>
                                    </div>
                                </div>
                                <div class="form-group reg_dop">
                                    <div class="col-md-offset-4 col-sm-2">
                                        <a href="#!/" ng-click="show('auto')"> Вход </a>
                                    </div>
                                    <div class=" col-sm-4">
                                        <a href="#!/" ng-click="show('registration')">Регистрация</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>