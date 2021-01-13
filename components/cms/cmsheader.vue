<template>
  <div class="cmscomponent cmsheader">
    <div>
      <b-navbar>
        <b-navbar-brand href="/cms">
          <img class="logo" src="~/assets/logo-inverted.svg">
        </b-navbar-brand>

        <b-collapse is-nav>
          <b-navbar-nav v-if="$auth.user.role_id == 1">
            <li class="nav-item">&nbsp;&nbsp;&nbsp;&nbsp;</li>
            <li class="nav-item"><nuxt-link class="nav-link" to="/cms/pages"><i class="fas fa-columns"></i>&nbsp;Pages</nuxt-link></li>
            <li class="nav-item"><nuxt-link class="nav-link" to="/cms/users"><i class="fas fa-users"></i>&nbsp;Users</nuxt-link></li>
            <b-nav-item-dropdown>
              <template slot="text"><i class="fas fa-cog"></i>&nbsp;Settings</template>
              <li class="nav-item"><nuxt-link class="nav-link" to="/cms/pricing"><i class="fas fa-money-check-alt"></i>&nbsp;Pricing</nuxt-link></li>
              <li class="nav-item"><nuxt-link class="nav-link" to="/cms/countries"><i class="fas fa-globe-americas"></i>&nbsp;Countries</nuxt-link></li>
              <li class="nav-item"><nuxt-link class="nav-link" to="/cms/coupons"><i class="fas fa-hand-holding-usd"></i>&nbsp;Coupons</nuxt-link></li>
              <li class="nav-item"><nuxt-link class="nav-link" to="/cms/tags"><i class="fas fa-tags"></i>&nbsp;Tags</nuxt-link></li>
              <li class="nav-item"><nuxt-link class="nav-link" to="/cms/categories"><i class="fas fa-stream"></i>&nbsp;Categories</nuxt-link></li>
              <li class="nav-item"><nuxt-link class="nav-link" to="/cms/colors"><i class="fas fa-palette"></i>&nbsp;Colors</nuxt-link></li>
              <li class="nav-item"><nuxt-link class="nav-link" to="/cms/seasons"><i class="fas fa-calendar"></i>&nbsp;Seasons</nuxt-link></li>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown>
              <template slot="text"><i class="fas fa-list"></i>&nbsp;Media</template>
              <li class="nav-item"><nuxt-link class="nav-link" to="/cms/designs"><i class="fas fa-image"></i>&nbsp;Designs</nuxt-link></li>
              <li class="nav-item"><nuxt-link class="nav-link" to="/cms/collections"><i class="fas fa-images"></i>&nbsp;Collections</nuxt-link></li>
              <li class="nav-item"><nuxt-link class="nav-link" to="/cms/requests"><i class="far fa-images"></i>&nbsp;Requests</nuxt-link></li>
              <li class="nav-item"><nuxt-link class="nav-link" to="/cms/exclusive"><i class="far fa-image"></i>&nbsp;Exclusive</nuxt-link></li>
              <li class="nav-item"><nuxt-link class="nav-link" to="/cms/masks"><i class="fas fa-tshirt"></i>&nbsp;Masks</nuxt-link></li>
              <li class="nav-item"><nuxt-link class="nav-link" to="/cms/maskRequests"><i class="fas fa-tshirt"></i>&nbsp;Mask Requests</nuxt-link></li>
            </b-nav-item-dropdown>
            <li class="nav-item"><nuxt-link class="nav-link" to="/cms/extra"><i class="fas fa-rss"></i>&nbsp;Extra</nuxt-link></li>
            <li class="nav-item"><nuxt-link class="nav-link" to="/cms/sales"><i class="fas fa-file"></i>&nbsp;Sales</nuxt-link></li>
          </b-navbar-nav>

          <b-navbar-nav v-else>
            <li class="nav-item">&nbsp;&nbsp;&nbsp;&nbsp;</li>
            <li class="nav-item"><nuxt-link class="nav-link" to="/cms/collections"><i class="fas fa-images"></i>&nbsp;Collections</nuxt-link></li>
            <li class="nav-item"><nuxt-link class="nav-link" to="/cms/designs"><i class="fas fa-image"></i>&nbsp;Designs</nuxt-link></li>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <li class="nav-item"><nuxt-link class="nav-link nuxt-link-active" to="/"><i class="fas fa-play-circle"></i>&nbsp;Website</nuxt-link></li>
            <li class="nav-item">
              <a class="nav-link nuxt-link-active" href="#" @click="$bvModal.show('modal-settings');">
                <img style="height: 20px;" :src="`/cloudfront/uploads/user/${$auth.user.avatar}`" v-if="$auth.user.avatar">
                <i class="fas fa-user" v-else></i>
                &nbsp;
                {{ $auth.user.first_name }}
              </a>
            </li>
            <li class="nav-item sign-out"><a class="nav-link nuxt-link-active" href="#" @click="$auth.logout()"><i class="fas fa-sign-out-alt"></i>&nbsp;Sign Out</a></li>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <Settings />
  </div>
</template>

<script>
import Settings from '~/components/cms/modals/settings';

export default {
  components: {
    Settings
  },
  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss">
.cmscomponent.cmsheader {
  .navbar {
    background: $brand;

    .logo {
      height: 40px;
    }

    .nav-item {
      a {
        color: rgba(255, 255, 255, .6);
        font-size: 14px;

        &.nuxt-link-active {
          color: #fff;
        }
      }

      ul .nav-item a {
        color: rgba(0, 0, 0, .6);

        &:hover {
          color: #000;
        }
      }
    }
  }
}
</style>
