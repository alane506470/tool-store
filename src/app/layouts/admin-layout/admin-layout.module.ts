import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

// tslint:disable-next-line: import-spacing
import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
// tslint:disable-next-line: import-spacing
import { UserComponent }            from '../../pages/user/user.component';
import { TableComponent }           from '../../pages/table/table.component';
import { TypographyComponent }      from '../../pages/typography/typography.component';
import { IconsComponent }           from '../../pages/icons/icons.component';
import { MapsComponent }            from '../../pages/maps/maps.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';
import { UpgradeComponent }         from '../../pages/upgrade/upgrade.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {WebcamModule} from 'ngx-webcam';
import { WebcamComponent } from 'app/pages/webcam/webcam.component';
import { DrapPictureComponent } from 'app/pages/drap-picture/drap-picture.component';
import { VideoStreamComponent } from 'app/pages/video-stream/video-stream.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { DragDropDirective } from 'app/shared/direct/drag-drop.directive';
import {DragDropModule} from '@angular/cdk/drag-drop'
import { MaterialModule } from 'app/shared/material-components.module';
import { MatButtonModule } from '@angular/material/button';
import { ScrollbarModule } from 'app/shared/scrollbar/scrollbar.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MaterialModule,
    NgbModule,
    WebcamModule,
    FlexLayoutModule,
    HttpClientModule,
    DragDropModule,
    ScrollbarModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    WebcamComponent,
    NotificationsComponent,
    DrapPictureComponent,
    VideoStreamComponent,
    DragDropDirective
  ]
})

export class AdminLayoutModule {}
