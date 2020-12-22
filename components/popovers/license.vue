<template>
  <div class="component licensePopover">
    <b-popover
        :target="target"
        triggers="click blur"
        placement="bottom"
        custom-class="design-license-popover"
      >
        <template v-slot:title>
          <b-button class="close" aria-label="Close">
            <span class="d-inline-block" aria-hidden="true">&times;</span>
          </b-button>
          <span v-html="$t('license_determines_usage')"></span>
        </template>

        <div>
          <table role="table" aria-busy="false" aria-colcount="3" class="table b-table">
            <thead role="rowgroup">
              <tr role="row">
                <th role="columnheader" scope="col" aria-colindex="1">
                  <div>&nbsp;</div>
                </th>
                <th role="columnheader" scope="col" aria-colindex="2">
                  <div :class="`text-center${selected == 1 ? ' active' : ''}`" style="text-transform: capitalize">{{ $t('standard') }}</div>
                </th>
                <th role="columnheader" scope="col" aria-colindex="3">
                  <div :class="`text-center${selected == 2 ? ' active' : ''}`" style="text-transform: capitalize">{{ $t('extended') }}</div>
                </th>
              </tr>
            </thead>
            <tbody role="rowgroup">
              <tr role="row">
                <td aria-colindex="1" role="cell">
                  <span>{{ $t('editorial') }}</span>
                </td>
                <td aria-colindex="2" role="cell" :class="`text-center${selected == 1 ? ' active' : ''}`">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
                <td aria-colindex="3" role="cell" :class="`text-center${selected == 2 ? ' active' : ''}`">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
              </tr>
              <tr role="row">
                <td aria-colindex="1" role="cell">
                  <span>{{ $t('advertising') }}</span>
                </td>
                <td aria-colindex="2" role="cell" :class="`text-center${selected == 1 ? ' active' : ''}`">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
                <td aria-colindex="3" role="cell" :class="`text-center${selected == 2 ? ' active' : ''}`">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
              </tr>
              <tr role="row">
                <td aria-colindex="1" role="cell">
                  <span>{{ $t('web_design') }}</span>
                </td>
                <td aria-colindex="2" role="cell" :class="`text-center${selected == 1 ? ' active' : ''}`">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
                <td aria-colindex="3" role="cell" :class="`text-center${selected == 2 ? ' active' : ''}`">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
              </tr>
              <tr role="row">
                <td aria-colindex="1" role="cell">
                  <span>{{ $t('social_media') }}</span>
                </td>
                <td aria-colindex="2" role="cell" :class="`text-center${selected == 1 ? ' active' : ''}`">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
                <td aria-colindex="3" role="cell" :class="`text-center${selected == 2 ? ' active' : ''}`">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
              </tr>
              <tr role="row">
                <td aria-colindex="1" role="cell">
                  <span>{{ $t('edit_and_modify') }}</span>
                </td>
                <td aria-colindex="2" role="cell" :class="`text-center${selected == 1 ? ' active' : ''}`">
                  <b-icon-check class="check"></b-icon-check>
                </td>
                <td aria-colindex="3" role="cell" :class="`text-center${selected == 2 ? ' active' : ''}`">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
              </tr>
              <tr role="row">
                <td aria-colindex="1" role="cell">
                  <span>{{ $t('multi_user') }}</span>
                </td>
                <td aria-colindex="2" role="cell" :class="`text-center${selected == 1 ? ' active' : ''}`">
                  <b-icon-check class="check"></b-icon-check>
                </td>
                <td aria-colindex="3" role="cell" :class="`text-center${selected == 2 ? ' active' : ''}`">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
              </tr>
              <tr role="row">
                <td aria-colindex="1" role="cell">
                  <span>{{ $t('resale_items') }}</span>
                </td>
                <td aria-colindex="2" role="cell" :class="`text-center${selected == 1 ? ' active' : ''}`">
                  <b-icon-check class="check"></b-icon-check>
                </td>
                <td aria-colindex="3" role="cell" :class="`text-center${selected == 2 ? ' active' : ''}`">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
              </tr>
          
            
            </tbody>
          </table>
              <div class="more-details">
             <a href="/legal/users-terms-and-conditions"> <p>{{$t('more_details')}}</p></a>
              </div>
        </div>
    </b-popover>
  </div>
</template>

<script>
import { BIconCheck } from "bootstrap-vue";

export default {
  props: ["target", "selected"],
  components: {
    BIconCheck
  }
};
</script>

<style lang="scss">
.design-license-popover {
  max-width: 500px !important;
  width: 400px;
  border: 1px solid #000;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);

  .popover-header {
    padding-top: 15px;
    background: #fff;
    border-bottom: none;
    color: $black;
    font-size: 16px;
    text-align: center;
    font-weight: 400;

    .close {
      display: none;
    }
  }

  .popover-body {
    .more-details {
      justify-content: center;
      display: flex;
      text-transform: uppercase;
      color: #0e8dde;
      p {
        font-weight: 700;
      }
    }
    .table th,
    .table td {
      border-top: none;
      border-bottom: none;
    }

    .table th {
      padding: 0;

      div:not(.active) {
        border-radius: 5px;
        padding: 5px 0;
        font-size: 16px;
        font-weight: 600;
        color: #666;
      }

      div.active {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background: $brand;
        padding: 5px 0;
        font-size: 16px;
        font-weight: 600;
        color: #fff;
        width: calc(100% + 1px);
      }
    }

    .table td {
      padding: 0.5rem;

      span {
        font-size: 16px;
        color: $black;
      }

      .check {
        font-size: 20px;
        color: #666;

        &.active {
          color: $brand;
        }
      }

      &.active {
        border: 1px solid $brand;
        border-bottom: none;
        border-top: none;

        &.last-col {
          border-bottom: 1px solid $brand;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
        }
      }
    }
  }
}
</style>