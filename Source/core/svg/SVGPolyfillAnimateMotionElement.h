// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#ifndef SVGPolyfillAnimateMotionElement_h
#define SVGPolyfillAnimateMotionElement_h

#include "core/svg/SVGPolyfillAnimationElement.h"

namespace blink {

class SVGPolyfillAnimateMotionElement : public SVGPolyfillAnimationElement {
    DEFINE_WRAPPERTYPEINFO();
public:
    DECLARE_NODE_FACTORY(SVGPolyfillAnimateMotionElement);

private:
    explicit SVGPolyfillAnimateMotionElement(Document&);
};

} // namespace blink

#endif // SVGPolyfillAnimateMotionElement_h
