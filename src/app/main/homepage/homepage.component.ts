import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/post.model';
import { Profile } from 'src/app/shared/profile.model';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

/**
 * faccio una get dei post presenti nel db, gli ordino per ordine cronologico
 * e li dispongo nella home page
 */

export class HomepageComponent implements OnInit {
  /**
   * lavoro con due vettori paralleli, uno dei post e uno dei profili.
   */
  posts: Post[];
  profiles: Profile[] = [];
  constructor(private profileService: AccountsService) { }

  ngOnInit(): void {
    this.fetchPostsInit();
  }

  /**
   * appena viene aperta la home page faccio una chiamata
   * get di tutti i post
   */
  private fetchPostsInit(){
    this.profileService.fetchPosts().subscribe(
      postsResponse => {
        postsResponse = postsResponse.sort((a: Post, b: Post) => {
          let res = new Date(b.dataPost).getDate() - 
          new Date(a.dataPost).getTime();
          return res;
        });
        this.posts = postsResponse;
        this.riempiProfili(this.posts);
      }
    )
  }

  private riempiProfili(posts: Post[]){
    for(let post of posts){
      //let profilo: Profile;
      //profilo = this.profileService.fetchAccount(post.idProfile);
      this.getAccount(post.idProfile);
      //this.profiles.push(profilo);
    }
    console.log(this.profiles);
  }


  private getAccount(idProfilo: string){
    this.profileService.fetchAccounts().subscribe(
      responseProfiles => {
        for(let profile of responseProfiles){
          if(profile.id === idProfilo){
            this.fillProfile(profile);
            this.profiles.push(profile);
            break;
          }
        }
      }
    )
  }


  private fillProfile(profile: Profile){
    if(profile.proPic === undefined || profile.proPic === null){
        profile.proPic = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
    }
}
}
